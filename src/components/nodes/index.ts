import { LoginNode } from './LoginNode';
import { DatabaseNode } from './DatabaseNode';
import { AiRequestNode } from './AiRequestNode';
import { PaymentNode } from './PaymentNode';
import { UploadNode } from './UploadNode';
import { ConditionNode } from './ConditionNode';

export const nodeTypes = {
  login: LoginNode,
  database: DatabaseNode,
  aiRequest: AiRequestNode,
  payment: PaymentNode,
  upload: UploadNode,
  condition: ConditionNode,
};
