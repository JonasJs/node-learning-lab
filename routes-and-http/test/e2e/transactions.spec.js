"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const node_child_process_1 = require("node:child_process");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const transactionBody = {
    title: 'New transaction',
    amount: 5000,
    type: 'credit',
};
(0, vitest_1.describe)('Transactions routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.beforeEach)(() => {
        // reseta o banco para que todos os teste sejam feitos de forma insolada
        (0, node_child_process_1.execSync)('npm run migrate:rollback');
        (0, node_child_process_1.execSync)('npm run migrate:latest');
    });
    (0, vitest_1.it)('should return status code 201 when create new transaction', async () => {
        const response = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send(transactionBody);
        (0, vitest_1.expect)(response.statusCode).toEqual(201);
    });
    (0, vitest_1.it)('should be able to list all transactions', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send(transactionBody);
        const cookies = createTransactionResponse.get('Set-Cookie') ?? [];
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(listTransactionsResponse.body.transactions).toEqual([
            vitest_1.expect.objectContaining({
                title: transactionBody.title,
                amount: transactionBody.amount,
            }),
        ]);
    });
    (0, vitest_1.it)('should be able to get a specific transation', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send(transactionBody);
        const cookies = createTransactionResponse.get('Set-Cookie') ?? [];
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);
        const id = listTransactionsResponse.body.transactions[0].id;
        const getTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/transactions/${id}`)
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(getTransactionResponse.body.transaction).toEqual(vitest_1.expect.objectContaining({
            title: transactionBody.title,
            amount: transactionBody.amount,
        }));
    });
    (0, vitest_1.it)('should be able to get the rummary', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send(transactionBody);
        const cookies = createTransactionResponse.get('Set-Cookie') ?? [];
        await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
            title: 'Debit transaction',
            amount: 2000,
            type: 'debit',
        });
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(listTransactionsResponse.body.summary).toEqual({
            amount: 3000,
        });
    });
});
