import feathers from 'feathers-client';
import superagent from 'superagent';
import { pubsub } from './index';

export default function Resolvers() {
  let app = this;
  
  const Todos = app.service('Todos');
  const TodoLists = app.service('TodoLists');
  const Users = app.service('users');
  const Viewer = app.service('viewer');

  const base = `http://${app.get('host')}:${app.get('port')}`;
  const Auth = feathers()
    .configure(feathers.rest(base).superagent(superagent))
    .configure(feathers.hooks())
    .configure(feathers.authentication());

  return {
    TodoList: {
      todos(todoList, args, context) {
        return Todos.find({
          query: {
            listId: todoList.id
          }
        });
      }
    },
    User: {
      todoLists(user, args, context) {
        return TodoLists.find({
          query: {
            ownerId: user.id
          }
        });
      }
    },
    RootQuery: {
      viewer(root, { token }, context) {
        return Viewer.find({
          provider: context.provider,
          token,
        });
      }
    },
    RootMutation: {
      createTodo(root, { listId, text, complete, token }, context) {
        return Todos.create({ text, complete, listId }, {
          provider: context.provider,
          token,
        })
          .then(todo => {
            pubsub.publish('todoChanges', {
              op: 'created',
              todo,
            });
          });
      },
      deleteTodo(root, { id, token }, context) {
        return Todos.remove(id, {
          provider: context.provider,
          token,
        })
          .then(todo => {
            pubsub.publish('todoChanges', {
              op: 'deleted',
              todo,
            });
          });
      },
      updateTodo(root, 
      { id, text, complete, token },
      context) {
        return Todos.patch(id, {
          text,
          complete,
        },{
          provider: context.provider,
          token,
        })
          .then(todos => {
            pubsub.publish('todoChanges', {
              op: 'updated',
              todo: todos[0],
            });
          });
      },
      createTodoList(root, { name, token }, context) {
        return TodoLists.create({
          name,
        }, { 
          provider: context.provider,
          token
        })
          .then(todoList => {
            pubsub.publish('todoListChanges', {
              op: 'created',
              todoList,
            });
          });
      },
      signUp(root, args, context) {
        return Users.create(args);
      },
      login(root, { email, password }, context) {
        return Auth.authenticate({
          type: 'local',
          email,
          password
        });
      },
    },
    Subscription: {
      todoChanges(todo) {
        return todo;
      },
      todoListChanges(todoList) {
        return todoList;
      },
    },
  }
}
