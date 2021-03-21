const Yup = require('yup');

// validando a requisição
const bankStatementDto = Yup.object()
  .shape({
    initial_date: Yup.date(),
    end_date: Yup.date(),
    transaction_type: Yup.string().oneOf(["incoming", "outgoing", "both"], "Provide one of the three transaction types: incoming, outgoing or both"),
    month: Yup.number().min(1).max(12)
  })
  .label('bankStatementRequestDTO');

module.exports = bankStatementDto;
