'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('TodoList service', function() {
  it('registered the TodoLists service', () => {
    assert.ok(app.service('TodoLists'));
  });
});
