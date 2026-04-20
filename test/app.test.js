const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {

    test('GET / should return 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    test('POST /users should create user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: "John" });

        expect(res.statusCode).toBe(201);
    });

});