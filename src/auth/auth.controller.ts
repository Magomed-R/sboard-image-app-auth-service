import { Controller, UseFilters } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { LoginDto } from './dto/loginDto'
import { AuthService } from './auth.service'
import { ExceptionFilter } from 'src/rpc-exception.filter'

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @UseFilters(new ExceptionFilter())
  @GrpcMethod('AuthService')
  login(loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
