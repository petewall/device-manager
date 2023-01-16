#!/usr/local/bin/node

const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('@fastify/static')
const path = require('path')
const superagent = require('superagent')

// const deviceService = process.env.DEVICE_SERVICE || 'http://localhost:3001'
const firmwareService = process.env.FIRMWARE_SERVICE || 'http://localhost:3002'

const port = process.env.PORT || 3000

fastify.register(require('@fastify/helmet'))
fastify.register(require('@fastify/view'), {
  engine: {
    ejs: require('ejs'),
  },
})

fastify.get('/', async function (req, reply) {
  const res = await superagent.get(`${firmwareService}/`)
  const deviceList = JSON.parse(res.text)

  const res2 = await superagent.get(`${firmwareService}/`)
  const firmwareList = JSON.parse(res2.text)
  
  const firmware = {}
  firmwareList.forEach((item) => {
    if (firmware[item.type]) {
      firmware[item.type].push(item)
      firmware[item.type].sort().reverse()
    } else {
      firmware[item.type] = [item]
    }
  })
  const firmwareTypes = Object.keys(firmware).sort()

  await reply.view('/templates/index.ejs', {
    deviceList, firmware, firmwareTypes
  })
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
