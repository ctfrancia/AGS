import { server } from "../index"
import { getUserDataById, getUserDataByName } from "./user.db"
const testUser = {
    id: "44e44268-dce8-4902-b662-1b34d2c10b8e",
    name: "Merrill",
    email: "merrillblankenship@quotezart.com",
    role: "user",
}

beforeAll(async () => {
    server.close();
    // console.log("Jest starting!");
});
// close the server after each test
afterAll(() => {
    server.close();
    // console.log("server closed!");
});


describe("getUserDataById tests", () => {
    test("Successfull fetch of data", async () => {
        const response = await getUserDataById(testUser.id)
        expect(response).toEqual(testUser)
    })

    test("Passing in a name instead of an Id should result in null", async () => {
        const response = await getUserDataById(testUser.name)
        expect(response).toEqual(null)
    })

    test("Passing in an e-name instead of an Id should result in null", async () => {
        const response = await getUserDataById(testUser.email)
        expect(response).toEqual(null)
    })

    test("Passing in a role instead of an Id should result in null", async () => {
        const response = await getUserDataById(testUser.role)
        expect(response).toEqual(null)
    })
})

describe("getUserByName tests", () => {
    test("Successfull fetch of data", async () =>{
        const response = await getUserDataByName(testUser.name)
        expect(response).toEqual(testUser)
    })

    test("Passing in an id instead of an name should result in null", async () => {
        const response = await getUserDataByName(testUser.id)
        /*
            for the life of me I can't figure out how I am getting a response back that
            isn't null. I have tried putting console logs in it to see where it is getting
            catching it is always responding with the user. Can't see how or why. All other
            cases has the proper response except for this one.
        */
        expect(response).toEqual(null)
    })

    test("Passing in an e-name instead of an name should result in null", async () => {
        const response = await getUserDataByName(testUser.email)
        expect(response).toEqual(null)
    })

    test("Passing in a role instead of an name should result in null", async () => {
        const response = await getUserDataByName(testUser.role)
        expect(response).toEqual(null)
    })
})