# TTP---Teste-Tecnico-Pratico
Repositório que busca atender as demandas contidas no teste prático enviado pela empresa Seidor

# 🚗 Controle de Utilização de Automóveis

## 📖 Descrição
API REST para controle da utilização de automóveis de uma empresa, permitindo
cadastrar motoristas, automóveis e registrar utilizações.

---

## ⚙️ Tecnologias utilizadas
- Node.js
- TypeScript
- Express
- Jest
- Supertest

---

## ▶️ Como executar a aplicação

### Pré-requisitos
- Node.js (versão X ou superior)
- npm

### Passos

npm install npm install express helmet dotenv morgan 

npm install -D typescript ts-node @types/express @types/helmet @types/dotenv @types/morgan  
npm run dev




## 🔧 Testes manuais com Postman

Durante o desenvolvimento, a API foi testada manualmente utilizando o Postman.
As rotas podem ser testadas através de requisições HTTP apontando para:

http://localhost:3000/api


## Para automoveis inclui: 
/automoveis, 
/automoveis/id, para pesquisa pelo id
/automoveis?search=palavra, para pesquisa de cor ou marca.

## O mesmo vale para
/motoristas,
/motoristas/id,
/motoristas?search=nome, pesquisa de nome do motorista

## E para utilizações
/utilizacoes, 
/utilizacoes/id

## Obs: os métodos PUT, GET utilizam-se das respectivas endpoints primeiras,
já os métodos GET com id, e os métodos  PATCH e DELETE precisam dos seus respectivos endpoints com /id

## 🧪 Testes de unidade

O projeto possui testes de unidade automatizados utilizando Jest e Supertest,
cobrindo regras de negócio e validações das principais funcionalidades.

## Executar os testes:
Para os testes unitários foram realizadas as seguintes instalações:
npm install -D ts-jest
npm i --save-dev @types/supertest (precisei deste passo para o supertestficar habilitado)


npm run test,

para testes específicos, segue o modelo: npm run test -- tests/controllers/automovelController.spec.ts

## 📂 Estrutura do projeto

src/models

src/repositories

src/controllers

src/routers

src/app.ts

src/server.ts

tests

## 📌 Observações

Este projeto utiliza repositórios em memória (arrays) para simular o banco de dados,
conforme solicitado no teste técnico.
