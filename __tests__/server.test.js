'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/models/index');
let id;

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

describe('Web server', () => {
    it('Should responed 404', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });
});

describe('food CRUD test', () => {
    it('add new item', async () => {
        const response = await mockRequest.post('/food').send({
            foodName: "foojel",
            foodType: "jordanain"
        });
        expect(response.status).toBe(201);
        id = response.body.id
    });
    it('get all items', async () => {
        const response = await mockRequest.get('/food');
        expect(response.status).toBe(200);
    });
    it('get one items', async () => {
        const response = await mockRequest.get(`/food/${id}`);
        expect(response.status).toBe(200);
    });
    it('update item', async () => {
        const response = await mockRequest.put(`/food/${id}`).send({
            foodName: "foojel",
            foodType: "jordanain"
        });
        expect(response.status).toEqual(201);
    });
    it('delete item', async () => {
        const response = await mockRequest.delete(`/food/${id}`);
        expect(response.status).toEqual(204);
    });
});

describe('clothes CRUD test', () => {
    it('add new item', async () => {
        const response = await mockRequest.post('/clothes').send({
            brandName: "foojel",
            clotheType: "jordanain"
        });
        expect(response.status).toBe(201);
        id = response.body.id
    });
    it('get all items', async () => {
        const response = await mockRequest.get('/clothes');
        expect(response.status).toBe(200);
    });
    it('get one items', async () => {
        const response = await mockRequest.get(`/clothes/${id}`);
        expect(response.status).toBe(200);
    });
    it('update item', async () => {
        const response = await mockRequest.put(`/clothes/${id}`).send({
            brandName: "foojel",
            clotheType: "jordanain"
        });
        expect(response.status).toEqual(201);
    });
    it('delete item', async () => {
        const response = await mockRequest.delete(`/clothes/${id}`);
        expect(response.status).toEqual(204);
    });
});


