const { Transaction } = require('../models');
const { Account } = require('../models');
const { getUsedCredit } = require('./creditBalance.service');
const { getAccountBalance } = require('./accountBalance.service');

module.exports = {
  billPayment: async (id, date) => {
    const openCreditTransactionsValue = parseFloat(await getUsedCredit(id));

    if (
      openCreditTransactionsValue === openCreditTransactionsValue ||
      openCreditTransactionsValue < 0
    ) {
      const balance = parseFloat(await getAccountBalance(id));

      if (
        openCreditTransactionsValue > 0 &&
        openCreditTransactionsValue <= balance
      ) {
        const updateTransactions = await Transaction.update(
          { transaction_pay_date: date },
          {
            where: {
              account_id: id,
              transaction_pay_date: null,
            },
          }
        );

        const updatedBalance = balance - openCreditTransactionsValue;
        const updateBalance = await Account.update(
          { balance: updatedBalance },
          { where: { id: id } }
        );
        const message = `Transaction completed successfully. Value paid: $ ${openCreditTransactionsValue}. Updated balance: $ ${updatedBalance}`;

        return message;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  },
};
