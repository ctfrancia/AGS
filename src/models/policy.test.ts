import { server } from "../index"
import { getPolicies, getUserByPolicy} from "./policy.db"

const testUser = {
    id: "a0ece5db-cd14-4f21-812f-966633e7be86",
    name: "Britney",
    email: "britneyblankenship@quotezart.com",
    role: "admin",
}
const policyNumber = "7b624ed3-00d5-4c1b-9ab8-c265067ef58b"
const fakePolicyNum = "12"
const userWithNoPolicies = "Jerry"

beforeAll(async () => {
    // do something before anything else runs
    server.close();
});
// close the server after each test
afterAll(() => {
    server.close();
    console.log("server closed!");
});


describe("test of getPolicies", () => {
    test("Successfull fetch of policies", async () => {
        const response = await getPolicies(testUser.name)
        expect(response).toHaveLength
    })

    test("When a user has no policies return approrate response", async () => {
        const response = await getPolicies(userWithNoPolicies)
        expect(response).toEqual(null)
    })
})

describe("test of getUserByPolicies", () => {
    test("Successfull fetch", async ()=> {
        const response = await getUserByPolicy(policyNumber)
        expect(response).toEqual(testUser)
    })

    test("If there is a policy without a user respond correctly", async () => {
        const response = await getUserByPolicy(fakePolicyNum)
        expect(response).toEqual(null)
    })
})
