const cliente = {
  nome: 'diego',
  conta: '0025-2',
  saldo: 0,
};

const cliente2 = {
  nome: 'mario',
  conta: '0025-1',
  saldo: 1000,
};

function sacar(valor) {
  this.saldo = 1000;
  if (saldo < valor) {
    console.log(`${valor} excede o limite disponível.`);
  }
}

const deposito = function (valorDepositado) {
  if (valorDepositado <= 0) {
    console.log('O valor depositado tem que ser maior que zero.');
  } else {
    cliente.saldo += valorDepositado;
    console.log(cliente.saldo);
  }
};

const debito = function (valor) {
  if (valor > cliente.saldo) {
    console.log('Saldo insuficiente.');
  } else {
    cliente.saldo -= valor;
    console.log(cliente.saldo);
  }
};

const consultarSaldo = function () {
  console.log(`Saldo: ${cliente.saldo}`);
};

const transferencia = function (valorTransferido) {
  cliente2.saldo -= valorTransferido;
  cliente.saldo += valorTransferido;
  console.log(
    `Transferido ${valorTransferido} para a conta de ${cliente.nome} com sucesso.`
  );
};
