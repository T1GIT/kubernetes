import { ViolationConfigDto } from '@/violations';
import { RepairBaseDto } from './repair-base.dto';

export class RepairConfigDto extends RepairBaseDto {
  violation: ViolationConfigDto;
  content: string;
}
