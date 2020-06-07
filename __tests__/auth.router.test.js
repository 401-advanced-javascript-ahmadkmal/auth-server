'use strict';
const basic = require('../src/auth/middleware/basic.js');
const base64 = require('base-64');
describe('authorizetion', () => {
  const reqsignin = {headers:{
    "authorization":"ahmadkmal:1234"
  }};
  const reqsignup = {};
  const res = {};
  const next = jest.fn();
  reqsignin.headers.authorization = base64.encode(reqsignin.headers.authorization);
  it('response with token', async () => {
    await basic(reqsignin, res, next);
    console.log('this is res',res);
    expect(res).toBeDefined();
  });

});