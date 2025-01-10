import { Injectable, OnModuleInit } from '@nestjs/common';
import { Reference, ReferenceDocument } from '../schemas/reference.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReferencesService implements OnModuleInit {
  constructor(
    @InjectModel(Reference.name) private referenceModel: Model<Reference>,
  ) {}

  async onModuleInit() {
    await this.referenceModel.deleteMany({});
    await this.referenceModel.create({
      path: 'config.yml',
      content: 'hello: world',
    });
  }

  async getAll(): Promise<ReferenceDocument[]> {
    return this.referenceModel.find().exec();
  }
}
