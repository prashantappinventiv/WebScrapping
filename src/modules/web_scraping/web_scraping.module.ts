import { Module } from '@nestjs/common';
import { WebScrappingController } from './web_scraping.controller';
import { WebScrappingService } from './web_scraping.service';
import { HttpResponse } from 'src/common/httpResponse';

@Module({
  controllers: [WebScrappingController],
  providers: [WebScrappingService, HttpResponse],
})
export class WebScrappingModule {}
