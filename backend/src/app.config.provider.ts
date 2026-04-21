import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      host: process.env.DATABASE_HOST,
      url: process.env.DATABASE_URL,
      driver: process.env.DATABASE_DRIVER,
      name: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  host: string;
  driver: string;
  url: string;
  name: string;
  username: string;
  password: string;
}
