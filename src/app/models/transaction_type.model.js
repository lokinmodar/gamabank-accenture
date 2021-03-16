import Sequelize, { Model } from 'sequelize';

class TransactionTypes extends Model {
  static init(sequelize) {
    super.init(
      {
        transaction_description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default TransactionTypes;
