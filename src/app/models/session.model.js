import Sequelize, { Model } from 'sequelize';

class Session extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        token: Sequelize.STRING,
      },
      {
        // configurações adicionais do sequelize
        sequelize,
      }
    );
    return this;
  }
}

export default Session;
