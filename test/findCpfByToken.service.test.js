const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/api/app');
const {
    cpfByToken
} = require('../src/api/services/findCpfByToken.service');


let should = require('chai').should();

describe('return cpf by token', function () {
  it('should return cpf', async function () {  
    should.equal('13584133122', await cpfByToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE2MTA0ODY3LCJleHAiOjE2MTYxMDc4Njd9.XOsb2ENcyLMCNZwGfHB_oSUZToQHSCV8QK2j1eF8AKQ'));
  });
  it('should return false if token does not exists', async function () {
    should.equal(false, await cpfByToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE2MTA0ODY3LCJleHAiOjE2MTYxMDc4Njd9.XOsb2ENcyLMCNZwGfHB_oSUZT'));
  });
});