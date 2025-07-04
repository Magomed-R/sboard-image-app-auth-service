import { Controller, UseFilters } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { SignupDto } from './dto/signup.dto'
import { VerifyDto } from './dto/verify.dto'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { ExceptionFilter } from 'src/rpc-exception.filter'

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @UseFilters(new ExceptionFilter())
  @GrpcMethod('AuthService', 'Login')
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @UseFilters(new ExceptionFilter())
  @GrpcMethod('AuthService', 'Signup')
  async signup(signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }

  @UseFilters(new ExceptionFilter())
  @GrpcMethod('AuthService', 'Verify')
  async verify(verifyDto: VerifyDto) {
    return this.authService.verify(verifyDto)
  }
}
