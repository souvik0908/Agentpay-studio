export type ExecutionStep = {
  title: string;
  description: string;
  state: string;
};

export type TaskRunResponse = {
  task_id: string;
  status: string;
  estimated_cost: string;
  provider: string;
  steps: ExecutionStep[];
  result: Record<string, unknown> | null;
};
