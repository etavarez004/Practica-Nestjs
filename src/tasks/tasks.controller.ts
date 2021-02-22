import { User } from './../auth/user.entity';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { TaskResponseDto } from './dto/task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<TaskResponseDto[]> {
    return this.tasksService.getasks(filterDto, user);
  }

  @Get(':id')
  getTasksById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskResponseDto> {
    return this.tasksService.getTasksById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskResponseDto> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTaskByid(@Param('id', ParseIntPipe) id: number) {
    this.tasksService.deleteTasksById(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
