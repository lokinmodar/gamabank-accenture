let cliente = {
    nome: 'diego',
    conta: '0025-2',
    saldo: 0
}

let cliente2 = {
    nome: 'mario',
    conta: '0025-1',
    saldo: 1000
}

function sacar(valor) {
    this.saldo = 1000    
    if(saldo < valor){
    console.log(`${valor} excede o limite disponível.`)
}
}

let deposito = function(valorDepositado) {
    if(valorDepositado <= 0) {
        console.log("O valor depositado tem que ser maior que zero.")
    } else {
        cliente.saldo += valorDepositado
        console.log(cliente.saldo)
    }
    
}

let debito = function(valor) {
    if(valor > cliente.saldo){
        console.log("Saldo insuficiente.")
    } else {
        cliente.saldo -= valor
        console.log(cliente.saldo)
    }
}

let consultarSaldo = function() {
    console.log(`Saldo: ${cliente.saldo}`)
}

let transferencia = function(valorTransferido) {
    cliente2.saldo -= valorTransferido
    cliente.saldo += valorTransferido
    console.log(`Transferido ${valorTransferido} para a conta de ${cliente.nome} com sucesso.`)
}

