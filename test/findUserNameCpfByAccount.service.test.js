const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/api/app');
const {
    getUsernameCPF
} = require('../src/api/services/findUsernameCpfByAccount.service');


let should = require('chai').should();

describe('return user_name and cpf by account_id', function () {
  it('should return user_name and cpf if account_id exists', async function () {
      let userName = await getUsernameCPF(1)
    should.equal('diego',userName.user_name);
  });
  it('should return false if user_name does not exist', async function () {
    let userName = await getUsernameCPF(10)
    should.equal(undefined, userName.user_name);
  });
});