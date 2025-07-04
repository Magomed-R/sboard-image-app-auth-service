import { IsString } from 'class-validator'

export class VerifyDto {
  @IsString()
  accessToken: string
}
