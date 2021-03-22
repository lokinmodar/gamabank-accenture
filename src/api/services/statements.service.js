module.exports = {
  statementToHtml: async (bill) => {
    let formattedBill = `<table border="1" style="width:100%"><tr><th>Id</th><th>Operation</th><th>Value</th><th>Date</th></tr>`;
    let billSum = 0;
    for (var key of Object.keys(bill)) {
      let myKey = parseInt(key)+1;
      formattedBill += `<tr><td>${myKey}</td><td>${bill[key].operation}</td><td>${bill[key].transaction_value}</td><td>${bill[key].created_at}</td></tr>`;
      billSum += parseFloat(bill[key].transaction_value);
    }
    formattedBill += `<tr><td colspan="2">Total: </td><td align="right" colspan="2">${billSum}</td></tr></table>`;

    return formattedBill;
  },
};
