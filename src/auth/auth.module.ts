import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { authProviders } from './auth.providers'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from 'src/constants'
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders]
})
export class AuthModule {}
