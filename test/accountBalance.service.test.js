const {
  getAccountBalance,
} = require('../src/api/services/accountBalance.service');
var should = require('chai').should();
var expect = require('chai').expect;

describe('verify balance', function () {
  it('Expect not null', async function () {
    let balance = await getAccountBalance(1);
    expect(balance).to.be.not.null;
  });
});
