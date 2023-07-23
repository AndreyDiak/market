import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe());

   app.use(
      session({
         secret: 'raymix',
         resave: false,
         saveUninitialized: false,
      }),
   );

   app.use(passport.initialize());
   app.use(passport.session());

   app.enableCors({
      credentials: true,
      origin: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
   });

   const config = new DocumentBuilder()
      .setTitle('Market')
      .setDescription('API desc')
      .setVersion('1.0')
      .addTag('API')
      .build();

   const document = SwaggerModule.createDocument(app, config);

   SwaggerModule.setup('docs', app, document);

   await app.listen(3000);
}
bootstrap();
