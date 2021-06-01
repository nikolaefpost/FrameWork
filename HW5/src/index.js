import { GraphQLClient, gql } from 'graphql-request'
import faker from 'faker'


async function usersGenerate(userIds) {
    const endpoint = 'http://localhost:8080/graphql'

    const graphQLClient = new GraphQLClient(endpoint)

    const mutation = gql`
        mutation addUser($users: [AddUserInput!]!) {
            addUser(input: $users) {
                user {
                    id
                    username
                    avatar
                    status
                    active
                }
            }
        }
    `

    let users = [];
    for (let i = 0; i < 100; i++) {
        users.push(
            {
                username: faker.internet.userName(),
                avatar: faker.internet.avatar(),
                status: faker.lorem.sentence(),
                active: faker.datatype.boolean()
            }
        )
    }
    const variables = {
        users: users
    }
    console.log('start')
    const data = await graphQLClient.request(mutation, variables)
    userIds.push(...data.addUser.user.map(u => u.id))

    console.log(JSON.stringify(data, undefined, 2))
}


async function generate() {
    let userIds = []
    await usersGenerate(userIds)
    console.log(userIds)
}

generate();