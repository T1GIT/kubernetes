import type { ViolationType } from '../const/violation-type'

export interface ViolationBaseDto {
  type: ViolationType
  createdAt: string
}

export interface ReferenceDto {
  path: string
  content: string
}

export interface ViolationConfigDto extends ViolationBaseDto {
  reference: ReferenceDto
  content: string
}

export type ViolationDto = ViolationConfigDto
