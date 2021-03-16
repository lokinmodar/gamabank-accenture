import Sequelize, { Model } from 'sequelize';

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        account_id: Sequelize.INTEGER,
        transaction_type_id: Sequelize.INTEGER,
        transaction_value: Sequelize.DECIMAL,
        incoming_cpf: Sequelize.STRING,
        target_bank_id: Sequelize.INTEGER,
        target_user_name: Sequelize.STRING,
        target_account_id: Sequelize.INTEGER,
        target_cpf: Sequelize.STRING,
        transaction_due_date: Sequelize.DATE,
        transaction_pay_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Transactions;
