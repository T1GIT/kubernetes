import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Violation,
  ViolationDocument,
} from '@/violations/schemas/violation.schema';
import { ViolationExternal } from '@/violations/dto/violation-external';
import { ViolationType } from '@/violations/constants/violation-type';

@Injectable()
export class ViolationsService {
  private readonly logger = new ConsoleLogger(ViolationsService.name);

  constructor(
    @InjectModel(Violation.name) private violationModel: Model<Violation>,
  ) {}

  async getAll(): Promise<ViolationDocument[]> {
    return this.violationModel.find().exec();
  }

  async save(
    external: ViolationExternal,
    type: ViolationType,
  ): Promise<ViolationDocument> {
    const violation = await this.violationModel.create({
      ...external,
      externalId: external._id,
      type,
    });

    this.logger.verbose(
      `Violation of type ${type} received: ${JSON.stringify(external)}`,
    );

    return violation;
  }
}
