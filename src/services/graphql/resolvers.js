import feathers from 'feathers-client';
import superagent from 'superagent';

export default function Resolvers() {
  let app = this;
  
  const Todos = app.service('Todos');
  const Users = app.service('users');
  const Viewer = app.service('viewer');

  const base = `http://${app.get('host')}:${app.get('port')}`;
  const Auth = feathers()
    .configure(feathers.rest(base).superagent(superagent))
    .configure(feathers.hooks())
    .configure(feathers.authentication());

  return {
    User: {
      todos(user, args, context) {
        return Todos.find({
          query: {
            ownerId: user.id
          }
        });
      }
    },
    RootQuery: {
      viewer(root, data, context) {
        return Viewer.find(data);
      }
    },
    RootMutation: {
      createTodo(root, { text, complete, token }, context) {
        return Todos.create({ text, complete }, { token });
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
    }
  }
}
