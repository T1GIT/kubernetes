import { ViolationDocument } from '../schemas/violation.schema';

export type ViolationExternalDto = Omit<ViolationDocument, 'type'>;
