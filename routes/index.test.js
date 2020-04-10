const fs = require("fs");
const app = require('../app');
const request = require('supertest');

// this test should be passing already
test('GET / returns Hello World', () => {
	return request(app).get('/').then(response => {
		expect(response.body).toEqual({'hello': 'world!'});
	});
});

// these tests will fail!
describe('api', () => {

	// before every test we will clear the "database" so tests don't affect each other
	beforeEach(function () {
		fs.writeFileSync('db.json', JSON.stringify([]));
	});

	// create a route to process GET requests to /api/notes
	test('GET /api/notes return return an empty list', (done) => {
		request(app)
			.get('/api/notes')
			.expect(200, [], done);
	});

	// POST /api/notes
	test('POST /api/notes should add a note to the list', (done) => {
		request(app)
			.post('/api/notes')
			.send({'text': 'test'})
			.expect(201, [{'id': 1, 'text': 'test'}], done);
	});

	// DELETE /api/notes
	test('DELETE /api/notes should delete a note from the list', (done) => {
		request(app)
			.post('/api/notes')
			.send({'text': 'test2'})
			.expect(201, [{'id': 1, 'text': 'test2'}])
			.end(() => {
				// should return an empty array after we delete the existing note
				request(app)
					.delete("/api/notes/1")
					.expect(200, [], done);
			});
	});

});