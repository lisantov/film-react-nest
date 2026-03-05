import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      url: process.env.DATABASE_URL,
      driver: process.env.DATABASE_DRIVER,
      name: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  name: string;
  password: string;
}
