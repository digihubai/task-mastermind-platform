
import { getOpenAIApiKey } from './apiKeyManagement';
import { AIModel } from './types';

// Base OpenAI API call function that handles common logic
export async function callOpenAI<T>(
  endpoint: string,
  body: any,
  model: AIModel = 'gpt-3.5-turbo'
): Promise<T> {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    throw new Error("OpenAI API key is not configured");
  }
  
  const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...body,
      model
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error("OpenAI API error:", errorData);
    throw new Error(`OpenAI API request failed: ${errorData.error?.message || response.statusText}`);
  }
  
  return await response.json() as T;
}
