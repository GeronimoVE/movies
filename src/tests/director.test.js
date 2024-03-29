const request = require('supertest');
const app = require("../app");
const Director = require('../models/Director');
require('../models');

let directorId;

test("POST /directors should create a director", async() => {
    const newDirector = {
        firstName: "Director",
        lastName: "New",
        nationality: "Terricola",
        image: "",
        birthday: "2023-03-21"
    }
    const res = await request(app).post("/directors").send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
})

test("GET /directors should return all directors", async() => {
    const res = (await request(app).get("/directors"));
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /directors/:id should update a director", async() => {
    const body = {
        firstName: "Director Updated",
        nationality: "Marciano"
    }
    const res = await request(app)
        .put(`/directors/${directorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
})

test("DELETE /directors should delete a director", async() => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
})
