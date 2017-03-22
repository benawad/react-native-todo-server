'use strict';

const assert = require('assert');
const addRelationship = require('../../../../src/services/user/hooks/addRelationship.js');

describe('user addRelationship hook', function() {
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
