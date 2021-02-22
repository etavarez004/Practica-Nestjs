import { User } from './../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

export class TaskMapper {
  public static toDto(entity: Task): TaskResponseDto {
    const { id, title, description, status } = entity;
    return new TaskResponseDto({ id, title, description, status });
  }

  public static toCreateEntity(dto: CreateTaskDto, user: User): Task {
    const entity = new Task();
    entity.title = dto.title;
    entity.description = dto.description;
    entity.status = TaskStatus.OPEN;
    entity.user = user;
    return entity;
  }
}
