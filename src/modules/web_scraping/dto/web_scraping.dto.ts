import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WebScrapingDto {
  @ApiProperty({
    required: true,
    example: 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3',
    description: 'The URL for web scraping',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'The HTML tag for data selection', example: 'p' })
  @IsNotEmpty()
  @IsString()
  tag: string;

  @ApiProperty({
    description: 'The attribute name for data extraction',
    example: 'text',
  })
  @IsNotEmpty()
  @IsString()
  attributeName: string;
}
