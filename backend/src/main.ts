import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(validationPipe);
  const config = new DocumentBuilder()
    .setTitle('Smart Championship')
    .addBearerAuth()
    .setDescription('Smart Championship API V1')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(+process.env.APP_PORT);
}
bootstrap();
