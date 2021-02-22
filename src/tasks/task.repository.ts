import { User } from './../auth/user.entity';
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTaks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId =:userId', { userId: user.id });

    if (status) query.andWhere('task.status=:status', { status });
    if (search)
      query.andWhere(
        'task.title LIKE :search or task.description LIKE :search',
        { search: `%${search}%` },
      );
    const tasks = await query.getMany();
    return tasks;
  }
}
