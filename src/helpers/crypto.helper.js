const bcrypt = require('bcryptjs');

module.exports = {
  encryptPassword: async (password, salt) => {
    if (!salt) salt = await bcrypt.genSalt();
    return {
      encryptedPassword: bcrypt.hashSync(password, salt),
      salt,
    };
  },

  comparePassword: async (password, salt, encryptedPasswordToCompare) => {
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword === encryptedPasswordToCompare;
  },
};
