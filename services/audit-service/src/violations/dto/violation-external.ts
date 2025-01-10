import { ViolationDocument } from '@/violations/schemas/violation.schema';

export type ViolationExternal = Omit<ViolationDocument, 'type'>;
