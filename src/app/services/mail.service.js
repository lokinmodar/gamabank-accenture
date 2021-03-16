import { sendmail } from '../../helpers/mail.helper';

const sendCongratulationsEmail = async () => {
  const from = 'cursonodejs@accenture.com';
  const to = 'jc.bombardelli@gama.academy';
  const subject = 'Olha essa fera ai meu!';
  const text =
    'REFACTOR blablablalb balbalblabl blablablalbalbalb blablablalbalb lbalba';
  const htmlTemplate =
    '<p>blablablalb balbalblabl blablablalbalbalb blablablalbalb lbalba</p>';

  sendmail(from, to, subject, text, htmlTemplate)
    .then((sended) => console.log(sended))
    .catch((error) => console.error(error));
};

module.exports = { sendCongratulationsEmail };
