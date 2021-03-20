const UserController = require('../controllers/user.controller');
const SessionController = require('../controllers/session.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const AccountController = require('../controllers/account.controller');
const InternalTransferController = require('../controllers/internalTransfer.controller');
const DebitPurchaseController = require('../controllers/debitpurchase.controller');
const DepositController = require('../controllers/deposit.controller');
const CreditPurchaseController = require('../controllers/creditPurchase.controller');



const SendEmail = require('../controllers/mail.controller');


const BankStatementController = require('../controllers/bankStatement.controller');



module.exports =  (app) => {

  app.get('/', (req, res) => {
    res.status(200).json({ Error: 'Nothing to see here...' })
  })


  app.route('/users').post(UserController.store);

  app.route('/sessions').post(SessionController.store);

  app.route('/externaldeposit').post(DepositController.store);

  app.use(authMiddleware);

  app.route('/internaltransfer').post(InternalTransferController.store);

  app.route('/debitpurchase').post(DebitPurchaseController.store);

  app.route('/creditpurchase').post(CreditPurchaseController.store);

  app.route('/accounts').post(AccountController.store);

  app.route('/sendMail').post(SendEmail.sendExtractEmail);

  app.route('/cardpayment').post();

  app.route('/bankstatement').get(BankStatementController.retrieve);








};
