export type PaymentRecord = {
  id: string;
  agent_id: string;
  task_id: string;
  provider: string;
  amount: string;
  status: string;
  receipt_ref: string;
};
