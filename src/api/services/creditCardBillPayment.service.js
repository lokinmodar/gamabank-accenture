const { Transaction } = require('../models');

module.exports = {
  openTransactions: async (id) => {
    const openCreditTransactions = await Transaction.update(
      { transaction_due_date: new Date() },
      { where: {
        id: id,
        transaction_due_date: null
        }
      }
    );
    let results = JSON.stringify(Object.assign({}, openCreditTransactions));
    let resultsJson = JSON.parse(results);
    return { message: "Credit Card Bill payment confirmed!"};
  },
};
