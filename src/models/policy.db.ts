import { Policy } from "../lib/interfaces/policy.interface"
import { Client } from "../lib/interfaces/client.interface"

const cache = new Map<string, Policy[] | Client>()
const policyUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5"