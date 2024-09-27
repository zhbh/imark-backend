import request from "supertest";
import app from "../app";


describe("POST /api/register", function () {
    it("The user exists", function () {
        return request(app)
            .post("/api/register")
            .send({ name: "test1", password: "Qwer1234!" })
            .expect(500)
            .expect({ "message": "The user exists" });
    });

    it("The user signs up successfully", function () {
        return request(app)
            .post("/api/register")
            .send({ name: "test" + Date.now(), password: "Qwer1234!", sex: "female", role: "user" })
            .expect(200);
    });
});

