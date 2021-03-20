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

#### Glória Teodoro

- [GitHub](https://github.com/gloriateodoro)
- [LinkedIn](https://www.linkedin.com/in/gl%C3%B3ria-teodoro-8910331b7/)

#### Rafael Mindicelo

- [GitHub](https://github.com/rafaelmindicelo)
- [LinkedIn](https://www.linkedin.com/in/rafael-mindicelo-2171389b/)



## 🚀 Tecnologias Utilizadas

- Javascript
- Node.js

### Dependências

- Bcrypt
- Mysql2
- Yup
- Bcrypt
- JWT
- Cross-env
- Chai
- Mocha

---

### Como clonar o projeto

É só clicar no link: [Clone do projeto](https://github.com/lokinmodar/gamabank-accenture.git) copiar o link do projeto, depois crie uma pasta para clonar o projeto, abra o git bash caso esteja no windows,(no linux é só abrir o terminal de comandos), escreva: git clone https://github.com/lokinmodar/gamabank-accenture.git e pronto.

### Como rodar o projeto

Já deu git clone no projeto? Tudo certo então, segundo passo é abrir o terminal para baixar a pasta node_modules com o comando: npm install, com o terminal aberto agora é dá o seguinte comando: npm run start:dev
e pronto, o projeto vai rodar no localhost na porta 3000. 

### Banco de dados

Crie um banco de dados no Mysql com o nome: gamabank. Em seguida rode as migrations e seeds que estão na pasta database > migrations, database > seeds.

### Rotas do projeto

Criação de conta de usuário: /users
Exemplo de POST request:
{
	"full_name": "xdsds",
	"user_name": "xsdsd",
	"user_email": "xdsds@gmail.com",
	"password": "123456x$dA",
	"telephone": "(11) 1234-5678",
	"cpf": "21798532620",
	"card_due_day": 10
}

### Link do projeto no Heroku

[Projeto no Heroku](https://gamabank-eventloop.herokuapp.com/)

# 🏦 Gama Bank 💲 Verde de dinheiro

<p align="center">
  <img src="https://media.tenor.com/images/63dc70b43a949617fdfa3447868d534d/tenor.gif" alt="Hulk Smart"/>
</p>

Nosso momento é de cada vez mais aprender sobre como administrar nosso patrimônio pois como diz o ditado "não tá facil pra ninguém", não é mesmo ? Sendo assim, queremos começar não só querer cuidar do nosso dinheiro, mas do seu também. Criamos a Gama Bank para ser uma fintech diferente e que seja acima de tudo capaz de transformar a vida das pessoas e suas carreiras (sacoou?)

## Nosso time, seu projeto de vida !

Ainda estamos em desenvolvimento e você juntamente com seu time deverão ser capazes de construir nosso MVP (Mínimo Produto Viável) e garantir que possamos disponibilizar para o time de frontend a implementação dessa solução, que para nós, será um divisor de águas na sua carreira (sacoou?)

## Objetivo
Construir uma aplicação web, utilizando Node.js e todas as bibliotecas e tecnologias que aprendemos durante o curso (você é livre para substituí-las mas fica por sua conta e risco, ok ?) e disponibiliza-las em um servidor em cloud com acesso irrestrito por zona ou por horario.


## Artefatos e entregaveis
* Disponibilização de uma API com deverá conter toda a aplicação e todas as suas rotas
* Disponibilização de uma pagina contendo a documentação dos recursos e as regras para execução dos mesmos
* Board projeto: [recomendamos o nosso template no trello](https://trello.com/b/omMyz2qd/projeto-gamabank)
* Fork deste repositório contendo:
    * Instruções de Instalação e operação
    * Detalhamento das funcionalidades
    * Membros envolvidos no projeto com seus perfis do github associados
    * Link para acesso ao repositório publicado em nuvem.


## Orientações
- Aplique as boas praticas de desenvolvimento, lembrese de temas como DRY e KISS
- Tenha sempre testes unitários  no seu projeto.


## Critérios de aceite
1. Entregou a API Backend devidamente documentada 
2. Cadastrou usúarios com as respectivas contas
3. Realizou transferencia entre conta existentes e/ou inexistentes
4. Realizou lançamentos de compras feitas com crédito e débito
5. Realizou envio de email confirmando o lançamento de crédito ou débito para o email do usuario
6. Exibiu o extrato bancário e fatura de crédito









