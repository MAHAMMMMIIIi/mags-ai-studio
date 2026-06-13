import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

@Injectable()
export class AgentQueueService implements OnModuleInit {
  private readonly logger = new Logger(AgentQueueService.name);
  private queue!: Queue;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    this.initializeQueue();
  }

  private initializeQueue(): void {
    const redisHost = this.configService.get('redis.host') || 'localhost';
    const redisPort = this.configService.get('redis.port') || 6379;

    this.queue = new Queue('agent-tasks', {
      connection: {
        host: redisHost,
        port: redisPort,
      },
    });

    this.logger.log('Agent queue initialized');
  }

  async addTask(taskId: string, data: any): Promise<void> {
    await this.queue.add(taskId, data);
  }

  async addWorkflow(data: any): Promise<void> {
    await this.queue.add('workflow', data);
  }

  getQueue(): Queue {
    return this.queue;
  }
}
