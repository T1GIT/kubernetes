import { ViolationDocument } from '../schemas/violation.schema';

export type ViolationExternal = Omit<ViolationDocument, 'type'>;
