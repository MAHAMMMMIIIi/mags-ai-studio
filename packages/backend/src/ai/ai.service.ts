import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, CompletionOptions, AIResponse, AIStreamToken } from './providers/ai-provider.interface';
import { OpenAIProvider } from './providers/openai.provider';

@Injectable()
export class AIService {
  private provider!: AIProvider;

  constructor(
    private configService: ConfigService,
    private openaiProvider: OpenAIProvider,
  ) {
    this.initializeProvider();
  }

  private initializeProvider(): void {
    const aiProvider = this.configService.get('ai.provider') || 'openai';
    
    if (aiProvider === 'openai') {
      this.provider = this.openaiProvider;
    } else {
      this.provider = this.openaiProvider; // Default to OpenAI
    }
  }

  async complete(options: CompletionOptions): Promise<AIResponse> {
    return this.provider.complete(options);
  }

  async *streamCompletion(options: CompletionOptions): AsyncGenerator<AIStreamToken> {
    yield* this.provider.streamCompletion(options);
  }

  estimateTokens(text: string): number {
    return this.provider.estimateTokens(text);
  }

  async getAvailableModels(): Promise<string[]> {
    return this.provider.getAvailableModels();
  }
}
