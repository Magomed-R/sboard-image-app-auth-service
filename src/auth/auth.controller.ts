import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { SignupDto } from './dto/signup.dto'
import { VerifyDto } from './dto/verify.dto'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @GrpcMethod('AuthService', 'Signup')
  async signup(signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }

  @GrpcMethod('AuthService', 'Verify')
  async verify(verifyDto: VerifyDto) {
    return this.authService.verify(verifyDto)
  }
}
