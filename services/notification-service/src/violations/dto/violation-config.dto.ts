import { ViolationBaseDto } from './violation-base.dto';

export class ReferenceDto {
  path: string;
  content: string;
}

export class ViolationConfigDto extends ViolationBaseDto {
  reference: ReferenceDto;
  content: string;
}
