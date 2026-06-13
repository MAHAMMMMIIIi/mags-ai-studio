import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AgentExecutorService {
  private readonly logger = new Logger(AgentExecutorService.name);

  async executeTask(task: any): Promise<any> {
    try {
      this.logger.log(`Executing task: ${task.id}`);
      return { result: 'success' };
    } catch (error) {
      this.logger.error(`Task failed: ${task.id} - ${(error as Error).message}`);
      throw error;
    }
  }
}
