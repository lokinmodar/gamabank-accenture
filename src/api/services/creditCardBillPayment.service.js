const { Transaction } = require('../models');
const { Account } = require('../models');
const { getUsedCredit } = require('./creditBalance.service');
const { getAccountBalance } = require('./accountBalance.service');
const { sendExtractEmail } = require('../controllers/mail.controller');

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

        const billPaymentTransaction = {
          account_id: id,
          transaction_type_id: 2,
          operation: 'Credit Card Bill Payment',
          transaction_value: openCreditTransactionsValue,
          transaction_due_date: new Date(),
          transaction_pay_date: new Date(),
        };
        const TransactionSaved = await Transaction.create(
          billPaymentTransaction
        );

        const updatedBalance = balance - openCreditTransactionsValue;
        const updateBalance = await Account.update(
          { balance: updatedBalance },
          { where: { id: id } }
        );

        const mail = await sendExtractEmail(
          billPaymentTransaction.operation,
          billPaymentTransaction.transaction_value,
          new Date(),
        );

        const message = `Transaction completed successfully. Value paid: $ ${openCreditTransactionsValue}. Updated balance: $ ${updatedBalance}. E-mail confirmation: ${mail}`;

        return message;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  },
};
