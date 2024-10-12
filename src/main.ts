import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blockchain Price Tracker')
    .setDescription(
      'An API for setting alerts and tracking blockchain prices using Moralis SDK',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  await app.listen(parseInt(process.env.APP_PORT));
}
bootstrap();
