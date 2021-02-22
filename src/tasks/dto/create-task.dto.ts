import { User } from './../../auth/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'The title cannot be empty' })
  title: string;
  @IsNotEmpty()
  description: string;

  user: User;
}
