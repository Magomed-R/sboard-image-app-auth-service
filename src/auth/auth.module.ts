import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { authProviders } from './auth.providers'
import { JwtModule } from '@nestjs/jwt'
import { jwtSecret } from 'src/constants'
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders]
})
export class AuthModule {}
