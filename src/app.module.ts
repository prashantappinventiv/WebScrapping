import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { WebScrappingModule } from './modules/web_scraping/web_scraping.module';
import configuration from 'config/configuration';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ScheduleModule.forRoot(),
    WebScrappingModule,
    LoggerModule,
  ],
  providers: [],
})
export class AppModule {}
