import Sequelize, { Model } from 'sequelize';
class TransactionTypes extends Model {
  
  static init(sequelize) {
    super.init(
      {
        transaction_description: DataTypes.STRING,
      },
      {
        sequelize,          
      }
    );
    return this;
  }
}
export default TransactionTypes;
