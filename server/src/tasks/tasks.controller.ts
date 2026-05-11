import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.taskService.createTask(body.userId, body);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.taskService.getAllTasks(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateTask(id, body.userId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: any) {
    return this.taskService.deleteTask(id, body.userId);
  }
}