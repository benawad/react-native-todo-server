'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('Todo service', function() {
  it('registered the Todos service', () => {
    assert.ok(app.service('Todos'));
  });
});
