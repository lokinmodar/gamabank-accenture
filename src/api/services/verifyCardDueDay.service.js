const verifyCardDueDay = async (day) => {
  if (day % 5 === 0 && day > 0 && day <= 30) {
    return true;
  }
  return false;
};

module.exports =  verifyCardDueDay;


