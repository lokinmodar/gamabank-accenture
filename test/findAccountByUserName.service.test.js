const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/api/app');
const {
    accountWithUserNameExists
} = require('../src/api/services/findAccountByUserName.service');


let should = require('chai').should();

describe('return account_id and cpf by user_name', function () {
  it('should return account_id and cpf if user_name exists', async function () {
      let verifyUser = await accountWithUserNameExists('rafael')
    should.equal(3,verifyUser.id);
  });
  it('should return false if user_name does not exist', async function () {
    let verifyUser = await accountWithUserNameExists('bruno')
    should.equal(undefined, verifyUser.id);
  });
});
