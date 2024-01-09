import axios from 'axios';
import * as cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';
import { WebScrapingDto } from './dto/web_scraping.dto';
import { ERROR_MESSAGE } from 'src/common/constant';

@Injectable()
export class WebScrappingService {
  async scrapeData(webScrapingDto: WebScrapingDto): Promise<string[]> {
    try {
      const states: string[] = [];
      const response = await axios.get(webScrapingDto.url);
      const $ = cheerio.load(response.data);

      $(webScrapingDto.tag).each((i, element) => {
        const data =
          webScrapingDto.attributeName === 'text'
            ? $(element).text().trim()
            : $(element).attr(webScrapingDto.attributeName);

        if (data) {
          states.push(data);
        }
      });

      return states;
    } catch (error) {
      console.error('Error during web scraping:', error);
      throw new Error(ERROR_MESSAGE.FAILED);
    }
  }
}
