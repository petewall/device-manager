#!/usr/local/bin/node

const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('@fastify/static')
const path = require('path')

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
})

fastify.get('/', function (req, reply) {
    reply.sendFile('index.html')
})

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'node_modules'),
    prefix: '/lib/',
    decorateReply: false, // the reply decorator has been added by the first plugin registration
    index: false,

})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
