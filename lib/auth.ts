import "server-only";

import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const SESSION_COOKIE_NAME = "couples_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const MIN_PASSWORD_LENGTH = 8;
const USERNAME_PATTERN = /^[a-z0-9_]{3,32}$/;

export type PublicUser = {
  id: string;
  username: string;
};

type AuthFailure = {
  ok: false;
  error: string;
  status: number;
};

type AuthSuccess = {
  ok: true;
  user: PublicUser;
};

export type AuthResult = AuthFailure | AuthSuccess;

function toPublicUser(user: { id: string; username: string }): PublicUser {
  return {
    id: user.id,
    username: user.username,
  };
}

function normalizeUsername(username: unknown) {
  return typeof username === "string" ? username.trim().toLowerCase() : "";
}

function validateCredentials(username: string, password: unknown): string | null {
  if (!USERNAME_PATTERN.test(username)) {
    return "Username must be 3-32 characters and use only lowercase letters, numbers, or underscores.";
  }

  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    return "Password must be at least 8 characters.";
  }

  if (password.length > 128) {
    return "Password must be 128 characters or fewer.";
  }

  return null;
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await prisma.session.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function registerWithPassword(
  usernameInput: unknown,
  password: unknown,
): Promise<AuthResult> {
  const username = normalizeUsername(usernameInput);
  const validationError = validateCredentials(username, password);

  if (validationError) {
    return {
      ok: false,
      error: validationError,
      status: 400,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (existingUser) {
    return {
      ok: false,
      error: "That username is already taken.",
      status: 409,
    };
  }

  const passwordHash = await bcrypt.hash(password as string, 12);
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
    },
  });

  await createSession(user.id);

  return {
    ok: true,
    user: toPublicUser(user),
  };
}

export async function loginWithPassword(
  usernameInput: unknown,
  password: unknown,
): Promise<AuthResult> {
  const username = normalizeUsername(usernameInput);

  if (!username || typeof password !== "string") {
    return {
      ok: false,
      error: "Invalid username or password.",
      status: 401,
    };
  }

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      passwordHash: true,
    },
  });

  if (!user) {
    return {
      ok: false,
      error: "Invalid username or password.",
      status: 401,
    };
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return {
      ok: false,
      error: "Invalid username or password.",
      status: 401,
    };
  }

  await createSession(user.id);

  return {
    ok: true,
    user: toPublicUser(user),
  };
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const session = await prisma.session.findFirst({
    where: {
      tokenHash: hashToken(sessionToken),
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return session ? toPublicUser(session.user) : null;
}

export async function logoutCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await prisma.session.deleteMany({
      where: {
        tokenHash: hashToken(sessionToken),
      },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}
