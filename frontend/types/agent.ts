export type Agent = {
  id: string;
  name: string;
  daily_budget: number;
  max_spend_per_action: number;
  allowed_providers: string[];
  max_paid_actions_per_minute: number;
  kill_switch: boolean;
  status: "active" | "paused";
};
