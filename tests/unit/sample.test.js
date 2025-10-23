const request = require('supertest');
const app = require('../../src/app');

describe('Sample Test Suite', () => {
    it('should return a 200 status for the home page', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should return a 404 status for a non-existent route', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.status).toBe(404);
    });
});