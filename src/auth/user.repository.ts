import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { HashHelper } from './../helpers/hash.helper';
import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './dto/jwt-payload.interface';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(authCredentialsDto: AuthCredentialsDto) {
    authCredentialsDto.password = await HashHelper.encrypt(
      authCredentialsDto.password,
    );
    const user = new User(authCredentialsDto);

    await user.save();
  }

  async singIn(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user: User = await User.findOne({ username });
    if (!user || !(await this.validateUserPassword(password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    return user.username;
  }

  async validateUserPassword(plain: string, encrypted: string) {
    return await HashHelper.compare(plain, encrypted);
  }
}
