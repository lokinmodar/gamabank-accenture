import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        balance: Sequelize.DECIMAL,
        credit_limit: Sequelize.DECIMAL,
        card_due_day: Sequelize.INTEGER,
      },
      {
        // configurações adicionais do sequelize
        sequelize,
      }
    );
    return this;
  }
}

export default Account;
