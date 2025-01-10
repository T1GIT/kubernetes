import { Controller, Get } from '@nestjs/common';
import { ReferencesService } from '../services/references.service';
import { ReferenceDocument } from '../schemas/reference.schema';

@Controller()
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get('/references')
  async getAll(): Promise<ReferenceDocument[]> {
    return this.referencesService.getAll();
  }
}
