const chaiHttp = require('chai-http');
const chai = require('chai');
const app =require('../src/api/app');
const {accountWithIdExists} = require('../src/api/services/accountExists.service')


  var should = require('chai').should()
  describe('verify if account exists',function() {
      it('should return true if account exists',async function() {
          should.equal(true,await accountWithIdExists(1))
      })
      it('should return false if account does not exist',async function() {
        should.equal(false,await accountWithIdExists(4))
    })
  })