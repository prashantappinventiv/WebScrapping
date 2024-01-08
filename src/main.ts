import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import bodyParser = require('body-parser');
import { LoggerMiddleware } from './middleware/logging.middleware';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CONSTANT, Swagger } from './common/constant';
import { AllExceptionsFilter } from './filter/exceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors();
  app.setGlobalPrefix(CONSTANT.API_ROOT_PATH);
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') ?? 8001;
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, new Logger()));
  app.use(bodyParser.json());
  app.use(new LoggerMiddleware().use);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const config = new DocumentBuilder()
    .setTitle(Swagger.Title)
    .setDescription(Swagger.Description)
    .setVersion(Swagger.Version)
    .addApiKey({
      type: 'apiKey',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Swagger.Path, app, document);
  await app.listen(port);
}
bootstrap();
