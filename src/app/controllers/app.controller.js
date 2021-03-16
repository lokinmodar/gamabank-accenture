import mailservice from '../services/mail.service';

const status = (request, h) => ({
  status: 'running',
  timestamp: new Date(),
});

const sendMail = (request, h) => {
  mailservice.sendCongratulationsEmail();
  return {
    status: 202,
  };
};

module.exports = { status, sendMail };
