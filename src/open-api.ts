import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

import { ApiConfigService } from './utils/apiConfigService';

export default class OpenApi {
  static async handler(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.swaggerSettings);

    SwaggerModule.setup('api/swagger', app, document);
  }

  static get swaggerSettings() {
    return new DocumentBuilder()
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
  }

  static get redocSettings(): RedocOptions {
    return {
      title: 'NBM API',
    };
  }
}
