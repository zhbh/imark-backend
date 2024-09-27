import request from "supertest";
import app from "../app";


describe("POST /api/login", function () {
    it("The user does not exist",  function () {
        return request(app)
            .post("/api/login")
            .send({ name: "test3", password: "123456" })
            .expect(500)
            .expect({"message":"The user does not exist"});
    });

    it("The username or password is not correct",  function () {
        return request(app)
            .post("/api/login")
            .send({ name: "test1", password: "123456" })
            .expect(500)
            .expect({"message":"The username or password is not correct"});
    });

    it("The user is forbidden to log in",  function () {
        return request(app)
            .post("/api/login")
            .send({ name: "test2", password: "Qwer1234!" })
            .expect(500)
            .expect({"message":"The user is forbidden to log in"});
    });

    it("The user logs in successfully",  function () {
        return request(app)
            .post("/api/login")
            .send({ name: "test1", password: "Qwer1234!" })
            .expect(200);
    });
});

