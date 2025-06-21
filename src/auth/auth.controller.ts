import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { LoginDto } from './dto/loginDto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @GrpcMethod('AuthService')
  login(loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
