#!/usr/local/bin/node

const fastify = require('fastify')({ logger: true })
const fastifyHttpProxy = require('@fastify/http-proxy')
const fastifyStatic = require('@fastify/static')
const path = require('path')

const deviceService = process.env.DEVICE_SERVICE || 'http://localhost:3001'
const firmwareService = process.env.FIRMWARE_SERVICE || 'http://localhost:3002'

const port = process.env.PORT || 3000

fastify.register(require('@fastify/helmet'))

fastify.get('/', function (req, reply) {
  reply.sendFile('index.html')
})

fastify.register(fastifyHttpProxy, {
  upstream: deviceService,
  prefix: '/api/device'
})

fastify.register(fastifyHttpProxy, {
  upstream: firmwareService,
  prefix: '/api/firmware'
})

fastify.register(fastifyStatic, {
  prefix: '/static/',
  root: path.join(__dirname, 'public'),
  index: false,           // Disallow browsing of node_modules
})

fastify.register(fastifyStatic, {
  prefix: '/lib/',
  root: path.join(__dirname, 'node_modules'),
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
