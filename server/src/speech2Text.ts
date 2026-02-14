import { GladiaSTT } from '@micdrop/gladia'
import { OpenaiSTT } from '@micdrop/openai'

const speech2Text = {
  gladia: () =>
    new GladiaSTT({
      apiKey: process.env.GLADIA_API_KEY || '',
    }),

  openai: () =>
    new OpenaiSTT({
      apiKey: process.env.OPENAI_API_KEY || '',
    }),
}

export default speech2Text
