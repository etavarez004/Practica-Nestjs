import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserResponseDto } from './dto/user.dto';
import { User } from './user.entity';
export class AuthMapper {
  public static toDo(entity: User): UserResponseDto {
    const dto = new UserResponseDto(entity);
    return dto;
  }

  public static toCreateEntity(dto: AuthCredentialsDto): User {
    const { username, password } = dto;
    const user = new User({ username, password });
    return user;
  }
}
