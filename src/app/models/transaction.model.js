const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactions.init(
    {
      account_id: DataTypes.INTEGER,
      transaction_type_id: DataTypes.INTEGER,
      transaction_value: DataTypes.DECIMAL,
      target_bank_id: DataTypes.INTEGER,
      target_user_name: DataTypes.STRING,
      target_cpf: DataTypes.STRING,
      transaction_due_date: DataTypes.DATE,
      transaction_pay_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'transactions',
    }
  );
  return transactions;
};
