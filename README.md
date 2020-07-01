# AGS
## Coding Challenge 

- This will be updated as changes are made for the server.
- In the `postman` folder is where you will find the JSON for importing routes and data by example.



## Getting Started
1. after cloning the repository: cd into the root directory (where the `index.ts` file and `node_modules` are located) the following command will remove the yarn lock file so that when installing the dependencies it will be a clean pull
`$ rm yarn.lock` and then:  `$npm i` or `yarn` depending on the dependency manager you use.

2. `$ npm run start:watch` or `$ yarn run start:watch` will start the server `CTRL-c` will stop the server

3. `$ npm test` or `$ yarn test` to run test suite

*note* while running test suite ensure server is not running or an error will occur saying pot is already in use.

## Routes
all routes are protected with JWT [which can found here](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZmQxNTliLTU3YzQtNGQzNi05YmQ3LWE1OWNhMTMwNTdiYiIsInJvbGUiOiJhZG1pbiJ9.4ji3z_CafXh3wSaU0HepDA_M_Ah8H5PCX8YvXd9uKTo) in the section titled `verify signature` make sure that they match in the `.env` file created if none is provided then the default secret is `dev` for further security this can be swapped from a secret to a `.pem` or private key.

### Error format

All responses will be formatted listed below, however, should there be an error whether it is an authentication, policy or user format the object sent back will be:
```JSON
{
    "errors": ["<REASON_FOR_ERROR>"]
}
```

### Reasons for error
#### Authentication
- "Authorization header missing" - this will be returned is no `Bearer` token is submitted in header
- "Wrong authorization strategy"  - this will be returned if the authorization strategy is not "Bearer"
- "Permission denied" - this will be returned if the user within the JWT doesn't have the appropriate role to access the route in question

#### Policies
- "No policies found" - this will be returned if the policy number or name for which is search is incorrectly applied *or* if there is no policy found.

#### Clients
- "No user found" - this will be returned 

the reason for the array is because as the server grows there maybe different reasons and array of strings, or number for specific reasons, will be added.

- `localhost:3000/user/id/:id` - `:id` represents the user id you are searching for. The return will be a JSON object of the user or if none is found a JSON object of the error format found about
- `localhost:3000/user/name/:name` - `:name` represents the user's name you are searching for. The return will be a JSON object of the client's name or an error format found about
- `localhost:3000/policy/client-name/:name` - `:name` represents the client's name for the policy you are searching for. The return will be a JSON array of policies attributed to the client's name or the error format found above
- `localhost:3000/policy/policy-number/:id` - `:id` represents the policy number/id that you are searching for. The return will be a JSON object of the user according to the policy number or an error format found about