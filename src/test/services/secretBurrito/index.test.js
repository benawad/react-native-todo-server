'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('secretBurrito service', function() {
  it('registered the secretBurritos service', () => {
    assert.ok(app.service('secretBurritos'));
  });
});
