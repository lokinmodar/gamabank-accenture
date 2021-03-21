const { Transaction } = require('../models');


module.exports = {
  findAllTransactions: async (id) => {
    const allTransactions = await Transaction.findAll({
      attributes: ['id', 'transaction_type_id', 'operation', 'transaction_value', 'created_at'],
      where: { account_id: id },
      order: [['created_at', 'DESC']],
      raw: true
    });
    let results = JSON.stringify(Object.assign({}, allTransactions));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },
  byPeriod: async (initial_date, end_date) => {
    const transactionsByPeriod = await Transaction.findAll({
      attributes: ['id', 'transaction_type_id', 'operation', 'transaction_value', 'created_at'],
      where: { account_id: id },
      order: [['created_at', 'DESC']],
      raw: true
    });
    let results = JSON.stringify(Object.assign({}, allTransactions));
    let resultsJson = JSON.parse(results);
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
