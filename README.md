PairSketch is a Next.js app for a private couples website. Part one adds
simple username/password authentication backed by PostgreSQL sessions.

## Getting Started

Create a local environment file and point it at a PostgreSQL database:

```bash
cp .env.example .env
npm install
npm run db:dev
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

- `/signup` creates a user with a hashed password.
- `/login` creates an httpOnly session cookie.
- `/dashboard` is protected and redirects anonymous visitors to `/login`.
- `/api/auth/me` returns the current user for future partner/canvas features.

## Database

The Prisma schema is in `prisma/schema.prisma`. Use:

```bash
npm run db:dev       # create or update local development migrations
npm run db:migrate   # apply migrations in hosted environments
npm run prisma:generate
```

For AWS hosting later, use a managed PostgreSQL database such as Amazon RDS
or Aurora PostgreSQL and set `DATABASE_URL` in the app environment.

## Next parts

After this auth foundation is approved, the next pieces are:

1. Partner connection codes.
2. Couple rooms.
3. Shared touch drawing canvas.
