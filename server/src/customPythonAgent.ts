import { Logger } from '@micdrop/server'
import { EventEmitter } from 'events'

export interface CustomAgentConfig {
  apiUrl?: string
  systemPrompt?: string
}

export class CustomPythonAgent extends EventEmitter {
  private apiUrl: string
  private systemPrompt: string
  private logger: Logger
  private conversationHistory: Array<{ role: string; content: string }> = []

  constructor(config?: CustomAgentConfig) {
    super()
    this.apiUrl = config?.apiUrl || 'http://127.0.0.1:5000/query'
    this.systemPrompt =
      config?.systemPrompt ||
      `You are a helpful voice assistant. Keep your responses short and helpful.`
    this.logger = new Logger('CustomPythonAgent')
  }

  async answer(userMessage: string): Promise<string> {
    try {
      this.logger.debug(`Sending to Python service: ${userMessage}`)

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: userMessage,
          system_prompt: this.systemPrompt,
        }),
      })

      if (!response.ok) {
        throw new Error(`Python service error: ${response.statusText}`)
      }

      const data = await response.json()
      const answer = data.response

      this.logger.debug(`Python service response: ${answer}`)

      return answer
    } catch (error) {
      this.logger.error(`Error calling Python service: ${error}`)
      throw error
    }
  }

  addMessage(role: string, content: string): void {
    this.conversationHistory.push({ role, content })
  }

  getConversationHistory(): Array<{ role: string; content: string }> {
    return this.conversationHistory
  }
}
