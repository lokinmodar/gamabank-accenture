const { Transaction } = require('../models');


module.exports = {
  findAllTransactions: async (id) => {
    const allTransactions = await Transaction.findAll({
      where: { account_id: id },
      order: [['created_at', 'DESC']]
    })
    return allTransactions;
  },
  byPeriod: async (initial_date, end_date) => {
    return;
  },
  byMonth: async (month) => {
    return;
  },
  filterIncoming: async (allResults) => {
    return;
  },
  filterOutgoing: async (allResults) => {
    return;
  }
};
