# 🏦 Gama Bank 💲 Verde de Dinheiro

## 🎯 Objetivo do Projeto

Facilitar a administração do dinheiro por meio de extratos, faturas, transações e outras atividades indispensáveis aos serviços financeiros.

## 📃 Sobre

O projeto Gama Bank foi desenvolvido durante o curso da Gama oferecido pela Accenture aos candidatos selecionados pela empresa. Durante a execução do projeto, a equipe colocou em prática o uso do MySQL, fez a integração dele por meio do ORM Sequelize e investiu em uma arquitetura detalhada e compreensível.

## 👨‍💻Integrantes
#### Bruno Ayres

- [GitHub](https://github.com/bjsec)
- [LinkedIn](https://www.linkedin.com/in/bruno-jorge-sec/)

#### Dante Souza

- [GitHub](https://github.com/lokinmodar)
- [LinkedIn](https://www.linkedin.com/in/dante-souza-e-souza/)

#### Diego Augusto

- [GitHub](https://github.com/debug-droid)
- [LinkedIn](https://www.linkedin.com/in/diego-augusto-b957921a2/)

#### Gabriel Chagas

- [GitHub](https://github.com/GabrielChagas1)
- [LinkedIn](https://www.linkedin.com/in/gabriel-chagas-analista-programador/)
<!-- #### Glória Teodoro

- [GitHub](https://github.com/gloriateodoro)
- [LinkedIn](https://www.linkedin.com/in/gl%C3%B3ria-teodoro-8910331b7/) -->

#### Rafael Mindicelo

- [GitHub](https://github.com/rafaelmindicelo)
- [LinkedIn](https://www.linkedin.com/in/rafael-mindicelo-2171389b/)



## 🧪 Tecnologias Utilizadas
- [Node](https://nodejs.org/en/)
- [Javascript](https://www.javascript.com/)

### 🔥 Dependências

- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Yup](https://www.npmjs.com/package/yup)
- [JWT](https://jwt.io/)
- [Cross-env](https://www.npmjs.com/package/cross-env)
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)

### 🚀 Como clonar o projeto

```bash
$ git clone https://github.com/lokinmodar/gamabank-accenture.git && cd gamabank-accenture
```
### 🚀 Como rodar o projeto

Siga os passos abaixo
```bash
# Install the dependencies
$ npm install

# Start the project
$ npm run start:dev
```

### 🚀 Banco de dados

Crie um banco de dados no Mysql com o nome: gamabank. 
```
CREATE SCHEMA gamabank;
```
Em seguida rode as migrations e seeds
```bash
# runinng migrations
$ npx sequelize-cli db:migrate

# runinng seeds
$ npx sequelize-cli db:seed:all
```
### 🎯 Como rodar os testes

Siga os passos abaixo
```bash
# run the tests
$ npm run test
```
### 📚 Documentação das rotas

- POST `/users` - Verificar status do servidor  
    Requisitos: N/A  
    Autenticação: N/A  

- POST `/sessions` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: N/A 

- POST `/externaldeposit` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: N/A 

- POST `/internaltransfer` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: JWT

- POST `/debitpurchase` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: JWT  

- POST `/creditpurchase` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: JWT 

- POST `/accounts` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: JWT 

- POST `/sendMail` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: JWT 

- GET `/sendMail` - Criar usuários  
    Requisitos: username, password, email, cpf, name, adress, phone  
    Autenticação: JWT 
## Arquitetura do Sistema 💻  

- Camada de controllers  
- Camada de serviços  
- Camada de modelos
- Camada   
- Camada de repositório com TypeORM  
- Variaveis de ambiente com informações sensíveis 


## 💻 Features do Sistema  

### Cadastro  
- Criação de conta de usuário  
- Criação do cliente do banco  
- Criação de conta corrente  
- Criação de cartão de crédito  
- Publicação do balanço inicial de conta corrente e fatura do cartão de crédio  

### Conta Corrente
- Compra com débito, utilizando saldo da conta corrente
- Extrato de movimentação da conta corrente(opcionalmente parametrizado)  
- Verificação do saldo atual da conta corrente  
- Auto deposito  
- Deposito de pessoa externa identificada  
### Transferências 
- Transferências internas entre contas
- Transferências externas para outros bancos indentificados
### Cartão de Crédito
- Compra no Cartão de crédito  
- Verificação fatura atual do cartão de crédito e lista de compras   
- Pagamento da fatura do cartão de crédito  

### E-mail 
- Envio de Email na compra de débito e crédito

## 💻 Projeto Online

- [Projeto](https://gamabank-eventloop.herokuapp.com/)
- [Swagger](https://gamabank-eventloop.herokuapp.com/documentation/)


<p align="center">Made with 💜 by EventLoop</p>