'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('addShareTodoList service', function() {
  it('registered the addShareTodoLists service', () => {
    assert.ok(app.service('addShareTodoLists'));
  });
});
