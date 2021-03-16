const bcrypt = require('bcryptjs');

export default {
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
