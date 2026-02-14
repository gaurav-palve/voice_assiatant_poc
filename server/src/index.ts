import * as dotenv from 'dotenv'
dotenv.config()

import fastifyWebsocket from '@fastify/websocket'
import fastify from 'fastify'
import call from './call'

const PORT = process.env.PORT || 8081

const server = fastify({ logger: true })

server.register(fastifyWebsocket, {
  errorHandler(error, socket) {
    console.error(error)
    socket.close(1011)
  },
})

server.register(call)

async function start() {
  try {
    await server.listen({ port: Number(PORT), host: '0.0.0.0' })
    console.log(`POC Server running on port ${PORT}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
