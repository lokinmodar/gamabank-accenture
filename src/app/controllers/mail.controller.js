const mailer = require('../../helpers/mail.helper');

const sendCongratulationsEmail = async () => {
  const from = 'cursonodejs@accenture.com';
  const to = 'emaili@domain.com';
  const subject = 'Olha essa fera ai meu!';
  const text =
    'REFACTOR blablablalb balbalblabl blablablalbalbalb blablablalbalb lbalba';
  const htmlTemplate =
    '<p>blablablalb balbalblabl blablablalbalbalb blablablalbalb lbalba</p>';

  mailer
    .sendmail(from, to, subject, text, htmlTemplate)
    .then((sended) => console.log(sended))
    .catch((error) => console.error(error));
};

export default { sendCongratulationsEmail };
