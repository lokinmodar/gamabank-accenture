const chaiHttp = require('chai-http');
const chai = require('chai');
const app =require('../src/api/app');
const userSignIn = require('../src/api/services/session.service')


  var should = require('chai').should()
  describe('verify token',function() {
      it('should return token',async function() {
          should.equal(true,await userSignIn())
      })
      it('should not return token',async function() {
        should.equal(false,await userSignIn())
    })
  })