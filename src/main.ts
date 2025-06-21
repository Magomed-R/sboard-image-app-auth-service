import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { ValidationPipe } from '@nestjs/common'
import 'reflect-metadata'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(process.cwd(), 'proto/auth.proto')
    }
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen()
}

bootstrap()
