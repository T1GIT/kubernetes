import { RepairDocument } from '../schemas/repair.schema';

export type RepairExternal = Omit<RepairDocument, 'type'>;
