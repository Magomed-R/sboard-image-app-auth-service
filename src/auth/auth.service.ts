import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { LoginDto } from './dto/loginDto'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { USER_REPOSITORY } from 'src/constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) throw new NotFoundException({ message: 'user not found by email', code: 'USER_NOT_FOUND' })

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
