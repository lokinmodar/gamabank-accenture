const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/api/app');
const {
  accountWithCpfExists,
} = require('../src/api/services/accountCpf.service');

let should = require('chai').should();

describe('verify if account exists by cpf', function () {
  it('should return account id if cpf exists', async function () {
    should.equal(3, await accountWithCpfExists('07306738127')); //TODO: assert error?
  });
  it('should return false if cpf does not exist', async function () {
    should.equal(false, await accountWithCpfExists('10048440426'));
  });
});
