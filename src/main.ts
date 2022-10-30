import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('NBM Api')
    .setDescription('NBM endpoints')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description:
          'The JWT token is required to access the some of the endpoints.',
        type: 'http',
        in: 'header',
        name: 'Authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .addBearerAuth(
      {
        description:
          'The JWT token is required to access the some of the endpoints.',
        type: 'http',
        in: 'header',
        name: 'Authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'AuthorizationJwtVerificationCode',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
