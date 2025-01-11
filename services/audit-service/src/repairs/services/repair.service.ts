import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Repair, RepairDocument } from '../schemas/repair.schema';
import { RepairExternal } from '../dto/repair-external';
import * as _ from 'lodash';
import { REPAIRS_LOG_SERVICE } from '@/repairs/constants/injections';
import { ClientProxy } from '@nestjs/microservices';
import { RepairType } from '../constants/repair-type';

@Injectable()
export class RepairService {
  private readonly logger = new ConsoleLogger(RepairService.name);

  constructor(
    @InjectModel(Repair.name) private repairModel: Model<Repair>,
    @Inject(REPAIRS_LOG_SERVICE) private readonly client: ClientProxy,
  ) {}

  async getAll(): Promise<RepairDocument[]> {
    return this.repairModel.find().exec();
  }

  async save(
    external: RepairExternal,
    type: RepairType,
  ): Promise<RepairDocument> {
    const repair = await this.repairModel.create(
      _.defaultsDeep({}, external, { type, violation: { type } }),
    );

    this.client.emit('repair', repair);

    this.logger.verbose(
      `Repair of type ${type} received: ${JSON.stringify(external)}`,
    );

    return repair;
  }
}
