const mailer = require('../../helpers/mail.helper');

const sendExtractEmail = async (operation, valueTransaction, dateTransaction) => {
  const from = 'cursonodejs@accenture.com';
  const to = 'emaili@domain.com';
  const subject = 'Olha essa fera ai meu!';
  const text = 'Email para retornar o extrato de uma transação';
  const operationValue = operation
  const valor = valueTransaction;
  const dataPagamento = dateTransaction;
  const htmlTemplate =
    `<h1>Extrato Transação ${operation != '' ? '- ' + operationValue : ''}</h1>`+
    `<p>Valor: R$${valor}</p>`+
    `<p>Data Pagamento: ${dataPagamento}</p>`;

  const mail = mailer
    .sendmail(from, to, subject, text, htmlTemplate)
    .then((sent) => {return sent})
    .catch((error) => console.error(error));

    return mail;
};

module.exports = { sendExtractEmail };
