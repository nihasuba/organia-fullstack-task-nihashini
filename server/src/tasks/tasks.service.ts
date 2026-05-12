import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // 1. Create a new task
  async createTask(userId: string, data: { title: string; description?: string; status?: string; dueDate?: string }) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        userId: Number(userId),
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
        status: data.status || 'To Do',
      },
    });
  }

  async getAllTasks(userId: string) {
    return this.prisma.task.findMany({
      where: { userId: Number(userId) },
      orderBy: { dueDate: 'desc' },
    });
  }

  async updateTask(id: string, userId: string, data: { title?: string; description?: string; status?: string }) {
    const task = await this.prisma.task.findUnique({ where: { id: Number(id) } });

    if (!task || task.userId !== Number(userId)) {
      throw new NotFoundException('Task not found or access denied!');
    }

    return this.prisma.task.update({
      where: { id: Number(id) },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
      },
    });
  }

  async deleteTask(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: Number(id) } });

    if (!task || task.userId !== Number(userId)) {
      throw new NotFoundException('Task not found or access denied!');
    }

    return this.prisma.task.delete({ where: { id: Number(id) } });
  }
}