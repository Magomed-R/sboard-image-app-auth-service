import { Inject, Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { USER_REPOSITORY } from 'src/constants'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { RpcException } from '@nestjs/microservices'
import * as grpc from '@grpc/grpc-js'
import { VerifyDto } from './dto/verify.dto'
import { JwtPayload } from './interfaces/jwtPayload'
import { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) throw new RpcException({ message: 'USER_NOT_FOUND', code: grpc.status.NOT_FOUND })

    const isMatchPassword = await bcrypt.compare(password, user.password)

    if (!isMatchPassword)
      throw new RpcException({ message: 'PASSWORD_DOES_NOT_MATCH', code: grpc.status.PERMISSION_DENIED })

    const jwtPayload: JwtPayload = { email, password: user.password }
    const accessToken = await this.jwtService.signAsync(jwtPayload)

    return {
      user: {
        id: user.id,
        email
      },
      accessToken
    }
  }

  async signup({ email, password }: SignupDto) {
    const user = await this.userRepository.findOneBy({ email })

    if (user) throw new RpcException({ message: 'EMAIL_ALREADY_USED', code: grpc.status.ALREADY_EXISTS })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword
    })

    await this.userRepository.save(newUser)

    const jwtPayload: JwtPayload = { email, password: hashedPassword }
    const accessToken = await this.jwtService.signAsync(jwtPayload)

    return {
      user: {
        id: newUser.id,
        email
      },
      accessToken
    }
  }

  async verify({ accessToken }: VerifyDto) {
    const { email, password } = await this.jwtService.verifyAsync<JwtPayload>(accessToken).catch(() => {
      throw new RpcException({ message: 'INVALID_BEARER_TOKEN', code: grpc.status.INVALID_ARGUMENT })
    })

    const user = await this.userRepository.findOneBy({ email })

    if (!user) throw new RpcException({ message: 'USER_NOT_FOUND', code: grpc.status.NOT_FOUND })

    const isMatchPassword = password === user.password

    if (!isMatchPassword)
      throw new RpcException({ message: 'PASSWORD_DOES_NOT_MATCH', code: grpc.status.PERMISSION_DENIED })

    return {
      user: {
        id: user.id,
        email
      }
    }
  }
}
