const { Account } = require('../models');
const { Transaction } = require('../models');
const Sequelize = require('sequelize');

module.exports = {
  getAccountCreditLimit: async (id) => {
    const availableCreditLimit = await Account.findOne({
      where: {
        id
      },
      attributes: ['credit_limit'],
    }).then((account) => account.get('credit_limit'));

    const accountCardDueDay = await Account.findOne({
      where: {
        id
      },
      attributes: ['card_due_day'],
    }).then((account) => account.get('card_due_day'));


    const datum = {
      credit_limit: availableCreditLimit,
      card_due_day: accountCardDueDay
    }

    return datum;
  },

  getUsedCredit: async (id) => {
    const usedCredit = await Transaction.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('transaction_value')), 'total']
      ],
      where: {
        'account_id': id,
        'transaction_pay_date': null
      }
    });

    return usedCredit[0].get('total');
  },

  getDateCard: async (card_due_day) => {
    const date = new Date();

    let card_date = new Date();

    if (card_due_day < date.getDate())
      card_date = new Date(date.getFullYear(), date.getMonth() + 1, card_due_day);
    else
      card_date = new Date(date.getFullYear(), date.getMonth(), card_due_day);

    return card_date;
  }
};
