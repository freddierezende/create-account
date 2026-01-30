# Gerenciamento de Usuários - React + GraphQL

Este projeto é um sistema completo de gerenciamento de usuários desenvolvido para demonstrar a integração entre um frontend moderno em React e uma API GraphQL.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React.js com Apollo Client para gerenciamento de estado e requisições.
- **Backend**: Node.js com Apollo Server (GraphQL).
- **Estilização**: CSS externo com foco em UI/UX limpa e moderna.

  ## 🗄️ Banco de Dados e Persistência

O projeto utiliza uma arquitetura de persistência real para garantir que os dados não sejam perdidos ao reiniciar a aplicação.

### Tecnologias Utilizadas:
* **PostgreSQL**: Banco de dados relacional para armazenamento seguro dos usuários.
* **Sequelize ORM**: Utilizado para mapeamento objeto-relacional, facilitando as operações de CRUD e a criação automática de tabelas.

### Como o banco está estruturado:
A tabela `Accounts` é gerada automaticamente pelo Sequelize com a seguinte estrutura:
* `id`: Identificador único (Integer, Primary Key).
* `name`: Nome completo do usuário (String).
* `email`: Endereço de e-mail (String/Unique).
* `password`: Senha (armazenada de forma segura para fins de teste).

### Como rodar o banco localmente:
1. Certifique-se de ter o **PostgreSQL** instalado e rodando em sua máquina.
2. Crie um banco de dados vazio chamado `create_account_db`.
3. Configure suas credenciais de acesso no arquivo de conexão do backend.
4. Ao rodar `node index.js`, o sistema executará o `sequelize.sync()`, criando as tabelas automaticamente.

> **Nota:** Para visualizar os dados em tempo real, recomenda-se o uso do **pgAdmin 4**.

## 🛠️ Funcionalidades

- **Listagem em Tempo Real**: Consumo de queries GraphQL para exibição de usuários cadastrados.
- **Criação de Contas**: Interface via Modal para inserção de novos dados no servidor.
- **Arquitetura Monorepo**: Organização clara entre os diretórios de frontend e backend.

## 📋 Como Rodar o Projeto

1. **Backend**:
   ```bash
   cd backend
   npm install
   node index.js
   ```
2. **Frontend**:
   ```
   npm start
   ```
