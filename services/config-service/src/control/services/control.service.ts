import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ReferenceDocument, ReferencesService } from '@/references';
import * as fs from 'node:fs';
import { ClientProxy } from '@nestjs/microservices';
import { CONTROL_SERVICE } from '@/control/constants/injections';
import * as path from 'node:path';
import * as process from 'node:process';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Violation,
  ViolationDocument,
} from '@/control/schemas/violation.schema';
import { Repair } from '@/control/schemas/repair.schema';

@Injectable()
export class ControlService {
  private readonly logger = new ConsoleLogger(ControlService.name);

  constructor(
    private referencesService: ReferencesService,
    @Inject(CONTROL_SERVICE) private readonly client: ClientProxy,
    @InjectModel(Violation.name) private violationModel: Model<Violation>,
    @InjectModel(Repair.name) private repairModel: Model<Repair>,
  ) {}

  async checkAll(): Promise<void> {
    this.logger.verbose('Checking all references');
    const references = await this.referencesService.getAll();

    for (const reference of references) {
      await this.check(reference);
    }
  }

  async check(reference: ReferenceDocument): Promise<void> {
    const content = fs.readFileSync(
      path.resolve(process.env.ROOT, reference.path),
      'utf-8',
    );
    const success = content === reference.content;

    if (!success) {
      const violation = await this.violationModel.create({
        reference,
        content,
      });

      this.logger.verbose(
        `Detected change in ${reference.path}. Current content is: \n${content}`,
      );

      this.client.emit('config-violation', violation);

      await this.repair(violation);
    }
  }

  async repair(violation: ViolationDocument): Promise<void> {
    const reference = violation.reference;

    fs.writeFileSync(
      path.resolve(process.env.ROOT, reference.path),
      reference.content,
    );

    const repair = await this.repairModel.create({
      violation,
      content: reference.content,
    });

    this.logger.verbose(`Config restored in ${reference.path}`);

    this.client.emit('config-repair', repair);
  }
}
