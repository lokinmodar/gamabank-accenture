const chaiHttp = require('chai-http');
const chai = require('chai');
const app =require('../src/api/app');
const {checkValueNotNegative} = require('../src/api/services/checkTransactionValue.service')


  var should = require('chai').should()
  describe('verify transaction value',function() {
      it('should return true if the transaction value <= 0',async function() {
          should.equal(true,await checkValueNotNegative(-1))
      })
      it('should return false if the transaction value > 0',async function() {
        should.equal(false,await checkValueNotNegative(1))
    })
  })