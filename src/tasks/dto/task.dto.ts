import { User } from './../../auth/user.entity';
import { TaskStatus } from '../task-status.enum';

export class TaskResponseDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  constructor(task: TaskResponseDto) {
    Object.assign(this, task);
  }
}
