#!/usr/local/bin/node

const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('@fastify/static')
const path = require('path')

const port = process.env.PORT || 3000
// const deviceService = process.env.DEVICE_SERVICE || 'localhost:3001'
// const firmwareService = process.env.FIRMWARE_SERVICE || 'localhost:3002'

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
})

fastify.get('/', function (req, reply) {
  reply.sendFile('index.html')
})

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'node_modules'),
  prefix: '/lib/',
  decorateReply: false,   // the reply decorator has been added by the first plugin registration
  index: false,           // Disallow browsing of node_modules
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
