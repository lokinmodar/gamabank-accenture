const chaiHttp = require('chai-http');
const chai = require('chai');
const app =require('../src/api/app');
const validateCpf = require('../src/api/services/validateCPF.service')


  var should = require('chai').should()
  describe('verify if cpf is valid',function() {
      it('should return true if cpf is valid (28678526688)',async function() {
          should.equal(true,await validateCpf('28678526688'))
      })
      it('should return false if the cpf is not valid (12345678911)',async function() {
        should.equal(false,await validateCpf('12345678911'))
    })
  })