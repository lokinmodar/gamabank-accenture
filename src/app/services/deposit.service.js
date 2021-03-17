module.exports = {
  checkValueNotNegative: async (transaction_value) => {
    if (transaction_value <= 0) return true;
  },
};
