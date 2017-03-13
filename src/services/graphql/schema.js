const typeDefinitions = `
type Todo {
  id: String
  ownerId: String
  text: String
  complete: Boolean
}

type User {
  id: String! 
  email: String!
  todos: [Todo]
}

type Authorized {
  token: String 
  data: User
}

type RootQuery {
  viewer: User
}

type RootMutation {
  createTodo (
    text: String!
    complete: Boolean
  ): Todo
  
  signUp (
    email: String!
    password: String!
  ): User

  login (
    email: String!
    password: String!
  ): Authorized
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default typeDefinitions;
