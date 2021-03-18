import internTransferDto from '../models/dto/internTransfer.dto';
import { accountWithIdExists } from '../services/account.service';
import { accountWithUserNameExists } from '../services/accountName.service'
import { accountWithCpfExists } from '../services/accountCpf.service'

 
class InternTransferController {
  async store(req, res) {
    const schema = internTransferDto;

    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ error_1: error.errors[0] });
    }

    if(req.body.target_account_id || req.body.target_account_name || req.body.target_account_cpf) {
      if(req.body.target_account_id !== null || req.body.target_account_id) {
        if(!await accountWithIdExists(req.body.target_account_id)) {
          return res.status(400).json({error: 'Target account does not exist.'})
        }
      // fazer o processamento usando o id da conta
      }
      if(req.body.target_account_name !== null || req.body.target_account_name) {
        if(!await accountWithUserNameExists(req.body.target_account_name)) {
          return res.status(400).json({error: 'Target account does not exist.'})
        }
        // fazer o processamento usando o user_name da conta
      }
      if(req.body.target_cpf !== null || req.body.target_cpf) {
        
        if(!await accountWithCpfExists(req.body.target_cpf)) {
          return res.status(400).json({error: 'Target account does not exist.'})
        }
        // fazer o processamento usando o cpf da conta
        const targetAccountId = await accountWithCpfExists(req.body.target_cpf)
        console.log(targetAccountId);
        if(await checkValueNotNegative(req.body.transaction_value)){
          return res.status(400).json({error: 'Transaction value must be greater than 0.'})
        }
        const transactionToInsert = {
          account_id: req.body.account_id,
          target_account_id: targetAccountId,
          transaction_type: 4,
          transaction_value: req.body.transaction_value,
          target_cpf: req.body.target_cpf,
          transaction_due_date: new Date(),
          transaction_pay_date: new Date(),
        };
        const transactionSaved = await Transaction.create(transactionToInsert);
    
        let currentBalance = await accountBalance(req.body.account_id);
        console.log(currentBalance);
        currentBalance += req.body.transaction_value;
        console.log(currentBalance);
        const newBalance = await Account.update(
          { balance: currentBalance },
          {
            where: { id: req.body.account_id },
          }
        );
        return res.json({ transactionSaved });
      }

    }

    
  }
}

export default new InternTransferController();
