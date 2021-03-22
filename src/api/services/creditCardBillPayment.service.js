const { Transaction } = require('../models');
const { Account } = require('../models');
const { getUsedCredit } = require('./creditBalance.service');
const { getAccountBalance } = require('./accountBalance.service');

module.exports = {
  billPayment: async (id, date) => {
    const openCreditTransactionsValue = parseFloat(await getUsedCredit(id));
    console.log(`Used Credit: ${openCreditTransactionsValue}`);

    if (
      openCreditTransactionsValue === openCreditTransactionsValue ||
      openCreditTransactionsValue < 0
    ) {
      const balance = parseFloat(await getAccountBalance(id));
      console.log(`Account balance: ${balance}`);

      if (openCreditTransactionsValue > 0 && openCreditTransactionsValue <= balance) {
        console.log('here');
        const updateTransactions = await Transaction.update(
          { transaction_pay_date: date },
          {
            where: {
              account_id: id,
              transaction_pay_date: null,
            },
          }
        );
        console.log('here here');
        const updatedBalance = balance - openCreditTransactionsValue;
        const updateBalance = await Account.update(
          { balance: updatedBalance },
          { where: { id: id } }
        );
        const message = `Transaction completed successfully. Value paid: $ ${openCreditTransactionsValue}. Updated balance: $ ${updatedBalance}`;
        console.log(`message: ${message}`);
        return message;
      } else {
        console.log('aqui');
        return 1;
      }
    } else {
      console.log('aqui 2');
      return 0;
    }
  },
};
