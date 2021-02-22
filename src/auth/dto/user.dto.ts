export class UserResponseDto {
  id: number;
  username: string;
  password: string;

  constructor(user: Partial<UserResponseDto>) {
    Object.assign(this, user);
  }
}
