const Yup = require('yup');

// validando a requisição
const bankStatementDto = Yup.object()
  .shape({
    initial_date: Yup.date(),
    end_date: Yup.date(),
    transaction_type: Yup.string().matches({options: { incoming:true, outgoing:true }}),
    month: Yup.number().min(1).max(12)
  })
  .label('bankStatementRequestDTO');

module.exports = bankStatementDto;
