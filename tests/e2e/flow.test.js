const request = require('supertest');
const app = require('../../src/app');

describe('E2E Flow Tests', () => {
    it('should load the home page', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome to the E-commerce App');
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should log in the user', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });

    it('should add a product to the cart', async () => {
        const response = await request(app)
            .post('/cart/add')
            .send({
                productId: '12345',
                quantity: 1
            });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product added to cart');
    });

    it('should proceed to checkout', async () => {
        const response = await request(app).get('/checkout');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Checkout');
    });

    it('should create an order', async () => {
        const response = await request(app)
            .post('/orders/create')
            .send({
                cartId: '67890',
                totalAmount: 100
            });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
    });
});