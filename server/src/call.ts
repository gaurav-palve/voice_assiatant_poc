import { handleError, Logger, MicdropServer } from '@micdrop/server'
import { FastifyInstance } from 'fastify'
import agents from './agents'
import { checkParams } from './params'
import { record } from './record'
import speech2text from './speech2Text'
import text2speech from './text2Speech'

export default async (app: FastifyInstance) => {
  app.get('/call', { websocket: true }, async (socket) => {
    try {
      const { lang } = await checkParams(socket)

      // Select providers: Python LLM (with documents) + Gladia STT + ElevenLabs TTS
      const agent = agents.openai(lang)
      const stt = speech2text.gladia()  //can also use speech2text.openai()
      const tts = text2speech.elevenlabs()

      // Start call
      const server = new MicdropServer(socket, {
        // firstMessage: 'Hello!',
        generateFirstMessage: true,
        agent,
        stt,
        tts,
      })

      // Listen to End event
      server.on('End', (call) => {
        console.log('Call ended', call)
      })

      // Setup recorder
      record(server)

      // Enable debug logs
      server.logger = new Logger('MicdropServer')
      agent.logger = new Logger(agent.constructor.name)
      stt.logger = new Logger(stt.constructor.name)
      tts.logger = new Logger(tts.constructor.name)
    } catch (error) {
      handleError(socket, error)
    }
  })
}
