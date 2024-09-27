import request from "supertest";
import app from "../app";


describe("GET /api/event", function () {
    it("Get all events", function () {
        return request(app)
            .get("/api/event")
            .send({ current: 1, pageSize: 10, all: true })
            .expect(200);
    });
});

