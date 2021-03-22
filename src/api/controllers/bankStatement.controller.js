const bankStatementDto = require('../models/dto/bankStatement.dto');
const findAccountIdByToken = require('../services/findAccountIdByToken.service');
const bankStatementService = require('../services/bankStatement.service');
const { formattedDate } = require('../services/dateFormat.service');
const { statementToHtml } = require('../services/statements.service')
const { sendExtractEmail } = require('../controllers/statementMail.controller');

class BankStatementController {
  async retrieve(req, res) {
    const schema = bankStatementDto;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ RequestFormatError: error.errors[0] });

    }

    const [, token] = req.headers.authorization.split(' ');

    const accountId = await findAccountIdByToken.accountIdByToken(token);

    if (req.body.month) {
      // tratar
      console.log(`Month: ${req.body.month}`);
    }
    if (req.body.initial_date && req.body.end_date) {
      // tratar
      const initialDate = await formattedDate(req.body.initial_date);
      const endDate = await formattedDate(req.body.end_date);

      const statement = await bankStatementService.byPeriod(accountId, initialDate, endDate);

      const statementToMail = await statementToHtml(statement);

      const mail = await sendExtractEmail(statementToMail, req.body.month, new Date().getFullYear());

      return res.status(200).json({ Message: 'Statement sent to your email', LinkToMail: mail })

    } else {
      if (req.body.transaction_type) {
        switch (req.body.transaction_type) {
          case 'incoming':
            // code block
            console.log('incoming');
            break;
          case 'outgoing':
            // code block
            console.log('outgoing');
          case 'both':
            // code block

            break;
          default:
            // code block
            res
              .status(400)
              .json({ Error: 'No transactions found for your account.' });
            return;
        }
      } else {
        const statement = await bankStatementService.findAllTransactions(
          accountId
        );
        const statementToMail = await statementToHtml(statement);

        const mail = await sendExtractEmail(statementToMail, req.body.month, new Date().getFullYear());

        return res.status(200).json({ Message: 'Statement sent to your email', LinkToMail: mail })
      }
    }

    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ ok: 'uiuiui' });
  }
}

module.exports = new BankStatementController();
