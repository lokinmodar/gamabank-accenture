const customer = {
  name: 'diego',
  account: '0025-2',
  balance: 0,
};

const customer2 = {
  name: 'mario',
  account: '0025-1',
  balance: 1000,
};

function withdraw(value) {
  this.balance = 1000;
  if (balance < value) {
    console.log(`${value} excede o limite disponível.`);
  }
}

const deposit = function (depositValue) {
  if (depositValue <= 0) {
    console.log('O value depositado tem que ser maior que zero.');
  } else {
    customer.balance += depositValue;
    console.log(customer.balance);
  }
};

const debit = function (value) {
  if (value > customer.balance) {
    console.log('balance insuficiente.');
  } else {
    customer.balance -= value;
    console.log(customer.balance);
  }
};

const consultarbalance = function () {
  console.log(`balance: ${customer.balance}`);
};

const transfer = function (transferredValue) {
  customer2.balance -= transferredValue;
  customer.balance += transferredValue;
  console.log(
    `Transferido ${transferredValue} para a account de ${customer.name} com sucesso.`
  );
};
