import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.get('DATABASE_DRIVER', 'mongodb'),
      url: configService.get(
        'DATABASE_URL',
        'mongodb://localhost:27017/practicum',
      ),
    },
  }),
  inject: [ConfigService],
};
