import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AgentQueueService } from '@/queue/agent-queue.service';

@Injectable()
export class WorkflowEngineService {
  private readonly logger = new Logger(WorkflowEngineService.name);

  constructor(
    private prisma: PrismaService,
    private queueService: AgentQueueService,
  ) {}

  async executeWorkflow(workflowId: string, userId: string): Promise<any> {
    this.logger.log(`Executing workflow ${workflowId}`);

    try {
      const workflow = await this.prisma.workflow.findUnique({
        where: { id: workflowId },
      });

      if (!workflow) {
        throw new Error('Workflow not found');
      }

      // Queue workflow execution
      await this.queueService.addWorkflow({
        workflowId,
        userId,
        steps: workflow.steps,
      });

      return { status: 'queued', workflowId };
    } catch (error) {
      this.logger.error(`Workflow execution failed: ${(error as Error).message}`);
      throw error;
    }
  }
}
