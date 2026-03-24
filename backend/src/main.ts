import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )


const config = new DocumentBuilder()
  .setTitle('Course API')
  .setDescription('Course management API')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },
    'access-token'
  )
  .build()

const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('docs', app, document)

  app.enableCors();

  const port = process.env.PORT ?? 3000
  await app.listen(port)

  console.log(`Server running at http://localhost:${port}`)
  console.log(`Swagger UI: http://localhost:${port}/docs`)
  console.log(`Health Check: http://localhost:${port}/health`)
    console.log(`Health Check: http://localhost:${port}/health/db`)
}

bootstrap()