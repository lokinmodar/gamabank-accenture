const mailer = require('../../helpers/mail.helper');

const sendExtractEmail = async (mailText, mes, ano) => {
  const from = 'cursonodejs@accenture.com';
  const to = 'emaili@domain.com';
  const subject = `Extrato via e-mail ref:  ${mes}/${ano}`;
  const text = 'Extrato via e-mail';
  const htmlTemplate =
    `<h1>Seu extrato:</h1><br><br>${mailText}`;

  const mail = mailer
    .sendmail(from, to, subject, text, htmlTemplate)
    .then((sent) => {
      return sent;
    })
    .catch((error) => console.error(error));

  return mail;
};

module.exports = { sendExtractEmail };
