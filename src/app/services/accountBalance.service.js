import Account from '../models/account.model';

module.exports = {

    accountBalance: async (id) => {
            
        const accountBalance = await Account.findOne({
          where: { id }, attributes: [ 'balance' ]
        }).then (balance => {
            balance.get('balance')
        });        
        return accountBalance        
    }
}

