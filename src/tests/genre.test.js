const request = require('supertest');
const app = require("../app");
const Genre = require('../models/Genre');
require('../models');

let genreId;

test("POST /genres should create a genre", async() => {
    newGenre = {
        name: "Genre created"
    }
    const res = await request(app)
        .post("/genres").send(newGenre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
})

test("GET /genres should return all genres", async() => {
    const res = await request(app).get("/genres");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);    
})

test("PUT /genres/:id should updated a genre", async() => {
    const body = {
        name: "Genre Updated"
    }
    const res = await request(app)
        .put(`/genres/${genreId}`).send(body);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(body.name);
})

test("DELETE /genres/:id should delete a genre", async() => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
})