import { User } from './../auth/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { TaskMapper } from './task.mapper';
import { TaskResponseDto } from './dto/task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}
  async getasks(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.getTaks(filterDto, user);
    const taskDtos = tasks.map(TaskMapper.toDto);
    return taskDtos;
  }

  async getTasksById(id: number) {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with ID ${id} not found`);
    return found;
  }
  async deleteTasksById(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }
  async updateTaskStatus(id: number, status: TaskStatus) {
    const task = await this.getTasksById(id);
    task.status = status;
    task.save();
    return task;
  }
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<TaskResponseDto> {
    const TaskEntity = TaskMapper.toCreateEntity(createTaskDto, user);
    const taskNew = await this.taskRepository.save(TaskEntity);
    return TaskMapper.toDto(taskNew);
  }
}
