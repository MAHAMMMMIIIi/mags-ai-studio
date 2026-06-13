import { Injectable } from '@nestjs/common';

@Injectable()
export class AgentsService {
  async createTask(data: any): Promise<any> {
    return { id: '1', ...data };
  }

  async executeTask(taskId: string): Promise<any> {
    return { taskId, status: 'executing' };
  }
}
