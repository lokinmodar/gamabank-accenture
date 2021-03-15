import Sequelize, { Model } from 'sequelize';
  class transactions extends Model {
    
    static init(sequelize) {
      super.init(
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
          
        }
        
      );
      return this;
    }
  }
  
  export default transactions;

