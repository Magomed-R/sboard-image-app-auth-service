import { Inject, Injectable } from '@nestjs/common'
import { LoginDto } from './dto/loginDto'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { RpcCodes, USER_REPOSITORY } from 'src/constants'
import { JwtService } from '@nestjs/jwt'
import { RpcException } from '@nestjs/microservices'

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) throw new RpcException({ message: 'USER_NOT_FOUND', code: RpcCodes.NOT_FOUND })

    const accessToken = await this.jwtService.signAsync({ email, password })

    return {
      user: {
        id: user.id,
        email
      },
      accessToken
    }
  }
}
