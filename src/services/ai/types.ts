
// Common types for AI services

export interface OpenAIResponse<T> {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    total_tokens: number;
  };
}

export interface LinkSuggestion {
  title: string;
  url: string;
}

export type AIModel = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-3.5-turbo';
