import { DBErrorCode } from '@common/enums';
import { UserExistsException } from '@common/exeptions/user-exists.exception';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthMapper } from './auth.mapper';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { JwtPayload } from './dto/jwt-payload.interface';
import { UserResponseDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  singUp(authCredentialsDto: AuthCredentialsDto) {
    const auth = AuthMapper.toCreateEntity(authCredentialsDto);

    try {
      return this.userRepository.singUp(auth);
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new UserExistsException(auth.username);
      }
    }
  }

  async singIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.singIn(authCredentialsDto);
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map(AuthMapper.toDo);
  }
}
