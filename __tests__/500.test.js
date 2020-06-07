'use strict';
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
describe('500 error', () => {
  
  it('return 500 ', () => {
    const obj = { name: 'orange ju' ,description: 'vit c',price:'2$' };
    return mockRequest
      .post('/signin')
      .send(obj)
      .then((results) => {
        expect(results.status).toBe(500);
      });
  });
});