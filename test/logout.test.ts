import request from "supertest";
import app from "../app";


describe("GET /api/logout", function () {
    it("The user logouts out",  function () {
        return request(app)
            .get("/api/logout")
            .expect(200);
    });
});

