const { Transaction } = require('../models');
const { Account } = require('../models');
const { getUsedCredit } = require('./creditBalance.service');
const { getAccountBalance } = require('./accountBalance.service');

module.exports = {
  openTransactions: async (id, date) => {
    const openCreditTransactionsValue = await getUsedCredit(id);
    const balance = await getAccountBalance(id);

    if (openCreditTransactions <= balance) {
      await Transaction.update(
        { transaction_due_date: date },
        {
          where: {
            account_id: id,
            transaction_due_date: null,
          },
        }
      );
      await Account.update(
        { balance: balance - openCreditTransactionsValue },
        { where: { id: id } }
      );
      return { message: 'Transaction completed successfully' };
    } else {
      return {
        error: 'Not enough account balance to process the transaction.',
      };
    }
  },
};
