import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { ValidationPipe } from '@nestjs/common'
import 'reflect-metadata'
import { PORT } from './constants'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(process.cwd(), 'proto/auth.proto'),
      url: `127.0.0.1:${PORT}`
    },
    logger: ['error', 'log', 'warn', 'debug']
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen()
}

bootstrap()
