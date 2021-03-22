const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/api/app');
const {
    checkUserExists,userWithIdExists,userWithEmailExists
} = require('../src/api/services/checkUserExists.service');


let should = require('chai').should();

describe('verify if user exists by user_name,user_email and cpf', function () {
  it('should return true if user_name exists', async function () {
    should.equal(true, await checkUserExists('rafael','refael@lisa.com.br','07306738127'));
  });
  it('should return undefined if user_name,user_email and cpf does not exist', async function () {
    should.equal(undefined, await checkUserExists('bruno','bruno@lisa.com.br','45678912345'));
  });
});

describe('verify if user_id exists by user_id', function (){
    it('should return true if user_id exists', async function () {
        should.equal(true, await userWithIdExists(3));
    });
    it('should return undefined if user_id does not exists', async function() {
        should.equal(undefined, await userWithIdExists(2356));
    })
});

describe('verify if user_id exists by user_email', function (){
    it('should return true if user_email exists', async function () {
        let user = await userWithEmailExists('refael@lisa.com.br')
        should.equal(3, user.id);
    });
    it('should return false if user_email does not exists', async function() {
        let user = await userWithEmailExists('rerfael@lisa.com.br')
        should.equal(undefined, user.user_email);
    })
});