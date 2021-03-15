import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

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
