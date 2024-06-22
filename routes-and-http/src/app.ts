import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)
// Todos plugins do fastify deve ter o 'async'
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
