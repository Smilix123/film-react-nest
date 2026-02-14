import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject('CONFIG') private readonly config: AppConfig) {}

  async onModuleInit() {
    await mongoose.connect(this.config.database.url);
    console.log('Connected to MongoDB');
  }
}
