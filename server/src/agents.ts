import { OpenaiAgent } from '@micdrop/openai'
// import { CustomPythonAgent } from './customPythonAgent'

function getSystemPrompt(lang: string) {
  return `You are a helpful voice assistant named Micdrop.
Your role is to help the user with their questions and requests.

## Instructions
- If you're first to speak, say "Hello, how can I help you today?" in ${lang} language.
- You're in a conversation, keep your answers short and helpful.
- Write your messages in full sentences, plain text, just one paragraph.
- Do not use formatting or Markdown.
- Do not use lists or bullet points.
- Do not use abbreviations.
- Do not use emojis.
`
}

export default {
  openai: (lang: string) =>
    new OpenaiAgent({
      apiKey: process.env.OPENAI_API_KEY || '',
      systemPrompt: getSystemPrompt(lang),
      autoEndCall: true,
      autoSemanticTurn: true,
      autoIgnoreUserNoise: true,
    }),

  // pythonCustom: (lang: string) =>
  //   new CustomPythonAgent({
  //     apiUrl: 'http://127.0.0.1:5000/query',
  //     systemPrompt: getSystemPrompt(lang),
  //   }),
}
