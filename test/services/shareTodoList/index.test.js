'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('shareTodoList service', function() {
  it('registered the shareTodoLists service', () => {
    assert.ok(app.service('shareTodoLists'));
  });
});
