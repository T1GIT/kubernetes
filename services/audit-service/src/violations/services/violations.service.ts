import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Violation, ViolationDocument } from '../schemas/violation.schema';
import { ViolationExternal } from '../dto/violation-external';
import { ViolationType } from '../constants/violation-type';
import { ClientProxy } from '@nestjs/microservices';
import { VIOLATIONS_LOG_SERVICE } from '../constants/injections';
import * as _ from 'lodash';

@Injectable()
export class ViolationsService {
  private readonly logger = new ConsoleLogger(ViolationsService.name);

  constructor(
    @InjectModel(Violation.name) private violationModel: Model<Violation>,
    @Inject(VIOLATIONS_LOG_SERVICE) private readonly client: ClientProxy,
  ) {}

  async getAll(): Promise<ViolationDocument[]> {
    return this.violationModel.find().exec();
  }

  async save(
    external: ViolationExternal,
    type: ViolationType,
  ): Promise<ViolationDocument> {
    const violation = await this.violationModel.create(
      _.defaultsDeep({}, external, { type }),
    );

    this.logger.verbose(
      `Violation of type ${type} received: ${JSON.stringify(external)}`,
    );

    this.client.emit('violation', violation);

    return violation;
  }
}
