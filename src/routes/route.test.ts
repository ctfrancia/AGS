import * as request from "supertest"
import { server } from "../index"
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZmQxNTliLTU3YzQtNGQzNi05YmQ3LWE1OWNhMTMwNTdiYiIsInJvbGUiOiJhZG1pbiJ9.4ji3z_CafXh3wSaU0HepDA_M_Ah8H5PCX8YvXd9uKTo"
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZmQxNTliLTU3YzQtNGQzNi05YmQ3LWE1OWNhMTMwNTdiYiIsInJvbGUiOiJ1c2VyIn0.jh98fZm-PTI3MeO3fC2p2L6ghJXELfRhxEiE7Q7M6fo"

const missingAuthHeader = "Authorization header missing"
const testUser = {
    "id": "44e44268-dce8-4902-b662-1b34d2c10b8e",
    "name": "Merrill",
    "email": "merrillblankenship@quotezart.com",
    "role": "user"
}
beforeAll(async () => {
 // do something before anything else runs
    console.log("Jest starting!");
});
// close the server after each test
afterAll(() => {
    server.close();
    console.log("server closed!");
});
describe("Get user/client information by Id", () => {
    test("Get home route GET /", async () => {
        const response = await request(server).get("/");
        expect(response.status).toEqual(404);
    });

    test("Get user information with valid jwt", async () => {
        const response = await request(server)
            .get("/user/id/a3b8d425-2b60-4ad7-becc-bedf2ef860bd")
            .set("Authorization", "Bearer " + adminToken)
            .expect("Content-Type", "application/json; charset=utf-8")
        
        expect(response.status).toEqual(200)
    })

    test("Receive appropriate message when Authorization header is missing", async () => {
        const response = await request(server)
        .get("/user/id/a3b8d425-2b60-4ad7-becc-bedf2ef860bd")
        .expect("Content-Type", "application/json; charset=utf-8")
    
        expect(response.body).toEqual({
            errors: [missingAuthHeader]
        })
        expect(response.status).toEqual(403)
    })

    test("Receive 404 when missing :id", async () => {
        const response = await request(server)
            .get("/user/id/")
            .set("Authorization", "Bearer " + adminToken)
            // .expect("Content-Type", "application/json; charset=utf-8")
        
        expect(response.body).toEqual({})
        expect(response.status).toEqual(404)
    })

    test("Receive 404 with a bad id (number)", async () => {
        const response = await request(server)
            .get("/user/id/23")
            .set("Authorization", "Bearer " + adminToken)
            .expect("Content-Type", "application/json; charset=utf-8")
        
        expect(response.body).toEqual({
            errors: ["User not found"]
        })
        expect(response.status).toEqual(404)
    })
});

describe("Get user/client data by name", () => {
    test("Successfull fetch by name", async () => {
        const response = await request(server)
            .get("/user/name/Merrill")
            .set("Authorization", "Bearer " + adminToken)
            .expect("Content-Type", "application/json; charset=utf-8")

        expect(response.status).toEqual(200)
    })

    test("Receive data when submitting as user role on route", async () => {
        const response = await request(server)
            .get("/user/name/Merrill")
            .set("Authorization", "Bearer " + userToken)
            .expect("Content-Type", "application/json; charset=utf-8")
    
        expect(response.body).toEqual(testUser)
        expect(response.status).toEqual(200)
    })
})

describe("Get user policies based on userID", () => {
    test("Get user policies", async () => {
        const response = await request(server)
            .get("/policy/client-name/Manning")
            .set("Authorization", "Bearer " + adminToken)
        
        expect(response.status).toEqual(200)
        expect(response.body).toBeTruthy()
    })
})

describe("Get user data based on policyID", () => {

    test("successfull request", async () => {
        const response = await request(server)
            .get("/policy/policy-number/7b624ed3-00d5-4c1b-9ab8-c265067ef58b")
            .set("Authorization", "Bearer " + adminToken)
        
        expect(response.status).toEqual(200)
    })

    test("receive denied access with wrong permissions", async () => {
        const response = await request(server)
            .get("/policy/policy-number/7b624ed3-00d5-4c1b-9ab8-c265067ef58b")
            .set("Authorization", "Bearer " + userToken)
        
        expect(response.status).toEqual(403)
        expect(response.body).toEqual({
            errors: ["Permission denied"]
        })
    })
})