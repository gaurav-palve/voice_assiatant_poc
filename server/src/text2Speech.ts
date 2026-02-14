import { ElevenLabsTTS } from '@micdrop/elevenlabs'
import { OpenaiTTS } from '@micdrop/openai'

const text2speech = {
  elevenlabs: () =>
    new ElevenLabsTTS({
      apiKey: process.env.ELEVENLABS_API_KEY || '',
      voiceId: process.env.ELEVENLABS_VOICE_ID || 'nPczCjzI2devNBz1zQrb',
      modelId: 'eleven_flash_v2_5',
    }),

  openai: () =>
    new OpenaiTTS({
      apiKey: process.env.OPENAI_API_KEY || '',
      voice: 'alloy',
    }),
}

export default text2speech
