const UserController = require('../controllers/user.controller');
const SessionController = require('../controllers/session.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const InternalTransferController = require('../controllers/internalTransfer.controller');
const DebitPurchaseController = require('../controllers/debitpurchase.controller');
const DepositController = require('../controllers/deposit.controller');
const CreditPurchaseController = require('../controllers/creditPurchase.controller');
const BankStatementController = require('../controllers/bankStatement.controller');
const ExternalTransferController = require('../controllers/externalTransfer.controller');
const CreditCardBillPaymentController = require('../controllers/creditCardBillPayment.controller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res
      .status(200)
      .json({
        Message:
          'Nothing to see here... Access the following URL for details about this API.',
        url: 'https://gamabank-eventloop.herokuapp.com/documentation/',
      });
  });

  app.route('/users').post(UserController.store);

  app.route('/sessions').post(SessionController.store);

  app.route('/externaldeposit').post(DepositController.store);

  app.use(authMiddleware);

  app.route('/internaltransfer').post(InternalTransferController.store);

  app.route('/externaltransfer').post(ExternalTransferController.store);

  app.route('/debitpurchase').post(DebitPurchaseController.store);

  app.route('/creditpurchase').post(CreditPurchaseController.store);

  app.route('/cardpayment').post(CreditCardBillPaymentController.store);

  app.route('/bankstatement').get(BankStatementController.retrieve);

  app.route('/externalTransfer').post(ExternalTransferController.store);
};
