const typeDefinitions = `
type Todo {
  id: String
  ownerId: String
  text: String
  complete: Boolean
}

type TodoCrud {
  op: String!
  todo: Todo!
}

type Subscription {
  todoChanges: TodoCrud
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
  viewer(token: String!): User
}

type RootMutation {
  createTodo (
    text: String!
    complete: Boolean
    token: String!
  ): Todo

  deleteTodo (
    id: String!
    token: String!
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
  subscription: Subscription
}
`;

export default typeDefinitions;
