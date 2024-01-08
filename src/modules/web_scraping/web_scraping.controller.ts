import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { HttpResponse } from 'src/common/httpResponse';
import { WebScrapingDto } from './dto/web_scraping.dto';
import { Response } from 'express';
import { WebScrappingService } from './web_scraping.service';
import { RESPONSE_DATA } from 'src/common/response';
import * as fs from 'fs';

@ApiTags('Web Scraping')
@Controller('/WebScrap')
export class WebScrappingController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly webScrappingService: WebScrappingService,
  ) {}

  /**
   * @description This function will be used for web scraping based on user input
   */

  @Post('/fetch-data')
  @ApiOperation({ summary: 'Web scraping endpoint' })
  @ApiResponse({ status: 200, description: 'Data successfully scraped' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check input parameters.',
  })
  async scrape(
    @Body() webScrapingDto: WebScrapingDto,
    @Res() response: Response,
  ) {
    try {
      const scrapedData =
        await this.webScrappingService.scrapeData(webScrapingDto);
      if (scrapedData && scrapedData.length > 0) {
        // Save the scraped data to a JSON file
        const fileName = 'scraped_data.json';
        fs.writeFileSync(fileName, JSON.stringify(scrapedData, null, 2));

        response.setHeader(
          'Content-Disposition',
          `attachment; filename=${fileName}`,
        );
        response.setHeader('Content-Type', 'application/json');
        fs.createReadStream(fileName).pipe(response.status(200));
      } else {
        return this.httpResponse.sendResponse(
          response,
          { statusCode: HttpStatus.OK },
          scrapedData,
        );
      }
    } catch (error) {
      console.error('error is', error);
      this.httpResponse.sendErrorResponse(
        response,
        RESPONSE_DATA.ERROR,
        error.message,
      );
    }
  }
}
