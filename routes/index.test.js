const fs = require("fs");
const app = require('../app');
const request = require('supertest');

test('GET / returns Hello World', () => {
    return request(app).get('/').then(response => {
        expect(response.body).toEqual({'hello': 'world!'});
    })
});

describe('api', () => {
    beforeEach(function () {
        fs.writeFileSync('db.json', JSON.stringify([]));
    });

    test('GET /api/notes return return an empty list', (done) => {
        request(app)
            .get('/api/notes')
            .expect(200, [], done);
    });

    test('POST /api/notes should add a note to the list', (done) => {
        request(app)
            .post('/api/notes')
            .send({'text': 'test'})
            .expect(201, [{'id': 1, 'text': 'test'}], done);
    });

    test('DELETE /api/notes should delete a note from the list', (done) => {
        // create a note whose text is test2, to make sure beforeEach is clearing the "db"
        request(app)
            .post('/api/notes')
            .send({'text': 'test2'})
            .expect(201, [{'id': 1, 'text': 'test2'}])
            .end(() => {
                // should be an empty array after we delete it
                request(app)
                    .delete("/api/notes/1")
                    .expect(200, [], done);
            });
    });

});