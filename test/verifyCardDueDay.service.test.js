const chaiHttp = require('chai-http');
const chai = require('chai');
const app =require('../src/api/app');
const verifyCardDueDay = require('../src/api/services/verifyCardDueDay.service')


  var should = require('chai').should()
  describe('verify card due day',function() {
      it('should return true if the day value = 5',async function() {
          should.equal(true,await verifyCardDueDay(5))
      })
      it('should return true if the day value = 10',async function() {
        should.equal(true,await verifyCardDueDay(10))
    })
    it('should return true if the day value = 15',async function() {
        should.equal(true,await verifyCardDueDay(15))
    })
    it('should return true if the day value = 20',async function() {
        should.equal(true,await verifyCardDueDay(20))
    })
    it('should return true if the day value = 25',async function() {
        should.equal(true,await verifyCardDueDay(25))
    })
    it('should return true if the day value = 30',async function() {
        should.equal(true,await verifyCardDueDay(30))
    })
      it('should return false if the card due day value (7) !== 5 || 10 || 15 || 20 || 25 || 30',async function() {
        should.equal(false,await verifyCardDueDay(7))
    })
    it('should return false if the card due day value (-1) !== 5 || 10 || 15 || 20 || 25 || 30',async function() {
        should.equal(false,await verifyCardDueDay(-1))
    })
    it('should return false if the card due day value (33) !== 5 || 10 || 15 || 20 || 25 || 30',async function() {
        should.equal(false,await verifyCardDueDay(33))
    })
  })