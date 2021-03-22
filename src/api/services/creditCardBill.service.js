const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Transaction } = require('../models');

module.exports = {
  openTransactionsByMonth: async (month) => {
    const openCreditTransactions = await Transaction.findAll({
      attributes: [
        'id',
        'operation',
        'transaction_value',
        'created_at',
        'transaction_due_date',
      ],
      where: {
        [Op.and]: [
          { transaction_pay_date: null },
          {
            where: {
              [Op.and]: [
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('transaction_due_date')), month),
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('transaction_due_date')), new Date().getFullYear())
              ],
            },
          },
        ],
      },
      order: [['created_at', 'DESC']],
      raw: true,
    });
    let results = JSON.stringify(Object.assign({}, openCreditTransactions));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },

  openTransactionsByPeriod: async (initial_date, end_date) => {
    const openCreditTransactions = await Transaction.findAll({
      attributes: [
        'id',
        'operation',
        'transaction_value',
        'created_at',
        'transaction_due_date',
      ],
      where: {
        [Op.and]: [
          { transaction_pay_date: null },
          {
            transaction_due_date: { [Op.between]: [initial_date, end_date] },
          },
        ],
      },

      order: [['created_at', 'ASC']],
      raw: true,
    });
    let results = JSON.stringify(Object.assign({}, openCreditTransactions));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },
};
