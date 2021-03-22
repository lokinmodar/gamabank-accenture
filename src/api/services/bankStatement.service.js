const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Transaction } = require('../models');

module.exports = {
  findAllTransactions: async (id) => {
    const allTransactions = await Transaction.findAll({
      attributes: [
        'id',
        'transaction_type_id',
        'operation',
        'transaction_value',
        'created_at',
      ],
      where: { account_id: id },
      order: [['created_at', 'DESC']],
      raw: true,
    });
    let results = JSON.stringify(Object.assign({}, allTransactions));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },
  byPeriod: async (id, initial_date, end_date) => {
    const transactionsByPeriod = await Transaction.findAll({
      attributes: [
        'id',
        'transaction_type_id',
        'operation',
        'transaction_value',
        'created_at',
      ],
      where: {
        [Op.and]: [
          { account_id: id },
          {
            transaction_due_date: { [Op.between]: [initial_date, end_date] },
          },
        ],
      },
      order: [['created_at', 'DESC']],
      raw: true,
    });
    let results = JSON.stringify(Object.assign({}, transactionsByPeriod));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },
  byMonth: async (id, month) => {
    const transactionsByMonth = await Transaction.findAll({
      attributes: [
        'id',
        'operation',
        'transaction_value',
        'created_at',
        'transaction_due_date',
      ],
      where: {
        [Op.and]: [
          { account_id: id },
          {
            where: {
              [Op.and]: [
                Sequelize.where(
                  Sequelize.fn('MONTH', Sequelize.col('created_at')),
                  month
                ),
                Sequelize.where(
                  Sequelize.fn('YEAR', Sequelize.col('created_at')),
                  new Date().getFullYear()
                ),
              ],
            },
          },
        ],
      },
      order: [['created_at', 'DESC']],
      raw: true,
    });
    let results = JSON.stringify(Object.assign({}, transactionsByMonth));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },
  filterIncoming: async (id) => {
    const allIncoming = await Transaction.findAll({
      attributes: [
        'id',
        'transaction_type_id',
        'operation',
        'transaction_value',
        'created_at',
      ],
      where: {
        [Op.and]: [{ account_id: id }, { target_cpf: null }],
      },
      order: [['created_at', 'DESC']],
      raw: true,
    });
    let results = JSON.stringify(Object.assign({}, allIncoming));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },
  filterOutgoing: async (id) => {
    const allOutgoing = await Transaction.findAll({
      attributes: [
        'id',
        'transaction_type_id',
        'operation',
        'transaction_value',
        'created_at',
      ],
      where: {
        [Op.and]: [
          { account_id: id },
          {
            where: {
              target_cpf: {
                [Op.ne]: null,
              },
            },
          },
        ],
      },
      order: [['created_at', 'DESC']],
      raw: true,
    });
    let results = JSON.stringify(Object.assign({}, allOutgoing));
    let resultsJson = JSON.parse(results);
    return resultsJson;
  },
};
