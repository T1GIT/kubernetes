import type { ViolationConfigDto } from '@/violations/dto/violation.dto'
import type { RepairType } from '../const/repair-type'

export interface RepairBaseDto<T extends RepairType> {
  type: T
  createdAt: string
}

export interface RepairConfigDto extends RepairBaseDto<RepairType.CONFIG> {
  violation: ViolationConfigDto
  content: string
}

export type RepairDto = RepairConfigDto
