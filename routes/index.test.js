const app = require('../app');
const request = require('supertest');

test('GET / returns Hello World', () => {
    return request(app).get('/').then(response => {
        expect(response.body).toEqual({'hello': 'world!'});
    })
});

describe('api', () => {
    test('GET /api/notes return return an empty list', (done) => {
        request(app)
            .get('/api/notes')
            .expect(200, [], done);
    })

    test('POST /api/notes should add a note to the list', (done) => {
        request(app)
            .post('/api/notes')
            .send({'text': 'test'})
            .expect(200, [{'id': 1, 'text': 'test'}], done);
    });

    test('DELETE /api/notes should delete a note from the list', (done) => {
        return request(app)
            .delete("/api/notes/1")
            .expect(200, [], done);
    });

});