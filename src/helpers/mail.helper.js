const nodemailer = require('nodemailer'); // https://nodemailer.com/about/
const configs = require('../configs/env');

const setup = async () => {
  let account;
  if (configs.env === 'test' || configs.env === 'development')
    account = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    // service: 'gmail' //não é necessario utilizar host e port nesse caso
    host: configs.mail.host, // https://ethereal.email/
    port: configs.mail.port,
    secure: false,
    auth: {
      user: account ? account.user : configs.mail.user,
      pass: account ? account.pass : configs.mail.pass,
    },
  });

  return transporter;
};

const sendmail = async (from, to, subject, text, htmlTemplate) => {
  const transporter = await setup();
  const result = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: htmlTemplate,
  });

  if (configs.env === 'test' || configs.env === 'development') {
    console.log('Message sent: %s', result.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result));
  }
  return nodemailer.getTestMessageUrl(result)
};

module.exports = { sendmail };
