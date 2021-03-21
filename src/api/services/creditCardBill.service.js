const { Transaction } = require('../models');


module.exports = {
  openTransactions: async (month) => {
    const openCreditTransactions = await Transaction.findAll({
      attributes: ['id', 'operation', 'transaction_value', 'created_at'],
      where: { transaction_due_date: null },
      order: [['created_at', 'ASC']],
      raw: true
    });
    let results = JSON.stringify(Object.assign({}, openCreditTransactions));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },

};
