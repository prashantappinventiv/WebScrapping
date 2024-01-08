import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString } from 'class-validator';

// export class WebScrapingDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   url: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   dataSelection: string;
// }

import { IsNotEmpty, IsString } from 'class-validator';

export class WebScrapingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tag: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  attributeName: string;
}
