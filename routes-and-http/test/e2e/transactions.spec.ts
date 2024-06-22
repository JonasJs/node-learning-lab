import { afterAll, beforeAll, expect, it, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../../src/app'

const transactionBody = {
  title: 'New transaction',
  amount: 5000,
  type: 'credit',
}

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    // reseta o banco para que todos os teste sejam feitos de forma insolada
    execSync('npm run migrate:rollback')
    execSync('npm run migrate:latest')
  })

  it('should return status code 201 when create new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send(transactionBody)

    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send(transactionBody)

    const cookies = createTransactionResponse.get('Set-Cookie') ?? []

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: transactionBody.title,
        amount: transactionBody.amount,
      }),
    ])
  })

  it('should be able to get a specific transation', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send(transactionBody)

    const cookies = createTransactionResponse.get('Set-Cookie') ?? []

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const id = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${id}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: transactionBody.title,
        amount: transactionBody.amount,
      }),
    )
  })

  it('should be able to get the rummary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send(transactionBody)

    const cookies = createTransactionResponse.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const listTransactionsResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
