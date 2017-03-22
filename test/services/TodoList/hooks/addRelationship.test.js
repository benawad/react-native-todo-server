'use strict';

const assert = require('assert');
const addRelationship = require('../../../../src/services/TodoList/hooks/addRelationship.js');

describe('TodoList addRelationship hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    addRelationship()(mockHook);

    assert.ok(mockHook.addRelationship);
  });
});
