import Sequelize, { Model } from 'sequelize';

  class Bank extends Model {
    static init(sequelize) {
      super.init({
        
        bank_name: DataTypes.STRING,
      },
    {
      sequelize,
    }
  );
  return this;
  }
}

export default Bank;
