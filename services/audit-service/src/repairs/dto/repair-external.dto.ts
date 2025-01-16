import { RepairDocument } from '../schemas/repair.schema';

export type RepairExternalDto = Omit<RepairDocument, 'type'>;
