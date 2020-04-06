const app = require('../app');
const request = require('supertest');

describe('GET /', () => {
    it('returns Hello World', () => {
        return request(app).get('/').then(response => {
            expect(response.body).toStrictEqual({'hello': 'world!'});
        })
    });
});