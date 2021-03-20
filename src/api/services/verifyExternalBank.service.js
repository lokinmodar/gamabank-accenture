const { Bank } = require('../models');

module.exports = {
  bankWithIdExists: async (id) => {
    const bankWithId = await Bank.findOne({
      where: { id },
    });
    if (bankWithId !== null && bankWithId.get('id') === id) {
      return true;
    }
    return false;
  },
};
