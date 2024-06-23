# Rotas e HTTP

API REST utilizando Fastify (um framework web rápido para Node.js), Knex (um Query Builder para SQL) e TypeScript (um superset do JavaScript que adiciona tipagem estática).

# Sobre a Aplicação

API para um aplicativo de controle de finanças.

# Testar a Aplicação

A API de produção está disponível no endpoint: [https://](https://). Para ver a documentação dos endpoints, acesse a [Documentação](https://github.com/JonasJs/node-learning-lab/blob/main/routes-and-http/requests/api.http) ou instale o plugin REST Client no VSCode.

# Tecnologias

- [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- [![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/) **ESLint**: Ferramenta de linting para identificar e corrigir problemas em JavaScript e TypeScript.
- [![TSX](https://img.shields.io/badge/TSX-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.npmjs.com/package/tsx) **TSX**: Utilitário para rodar arquivos TypeScript.
- [![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org/index.html) **SQLite**: Banco de dados relacional leve que não precisa de um servidor separado.
- [![Migrations](https://img.shields.io/badge/Migrations-FF4500?style=flat)](https://knexjs.org/#Migrations) **Migrations**: Gerenciamento da evolução da estrutura do banco de dados.
- [![REST Client](https://img.shields.io/badge/REST_Client-0078D4?style=flat&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) **REST Client (plugin VSCode)**: Plugin para documentar e testar requisições HTTP.
- [![Vitest](https://img.shields.io/badge/Vitest-6E4C13?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/) **Vitest**: Ferramenta de testes para JavaScript e TypeScript.
- [![Tsup](https://img.shields.io/badge/Tsup-0A0A0A?style=flat&logo=esbuild&logoColor=white)](https://tsup.egoist.dev/) **Tsup**: Bundler para JavaScript e TypeScript.
- [![Supertest](https://img.shields.io/badge/Supertest-0A0A0A?style=flat&logo=node.js&logoColor=white)](https://github.com/visionmedia/supertest) **Supertest**: Biblioteca para testar requisições HTTP.

## Requisitos Funcionais

- [x] O usuário deve poder criar uma nova transação.
- [x] O usuário deve poder obter um resumo da sua conta.
- [x] O usuário deve poder listar todas as transações feitas.
- [x] O usuário deve poder visualizar uma transação específica.

## Regras de Negócio

- [x] A transação pode ser do tipo crédito, que somará ao valor total, ou débito, que subtrairá.
- [x] Deve ser possível identificar o usuário entre as requisições (não teremos autenticação, por isso é importante identificar o usuário).
- [x] O usuário só poderá visualizar as transações criadas por ele.

## Requisitos Não Funcionais

* Adicionar requisitos não funcionais aqui.

# Como Testar

Estamos usando o plugin REST Client do VSCode para documentar nossas requisições. Basta instalar o plugin, acessar a pasta `requests` e utilizar os métodos documentados dentro dela.

# Aprendizados

### Banco de Dados: SQLite

Utilizamos o SQLite porque, além de ser um banco relacional, é muito leve e não precisamos de um servidor separado para utilizá-lo. Todos os dados do SQLite são salvos em um único arquivo físico dentro do nosso projeto. Outra vantagem é que não precisamos configurar nada, tornando ainda mais fácil de implementar. As queries são semelhantes a outros bancos de dados relacionais, facilitando a migração e reutilização do conhecimento.

### Comunicação com o Banco de Dados: Knex

Existem diversas estratégias de conexão com nosso banco de dados. As três formas mais comuns são:

1. **Drivers Nativos**:
   - Ferramentas/libs de baixo nível que permitem comunicação direta com o banco de dados, executando queries em SQL de forma menos abstrata.
   - Exemplo:
     ```sql
     SELECT * FROM table;
     ```

2. **Query Builder**:
   - Ferramenta que facilita a escrita de queries SQL utilizando a linguagem escolhida. Utilizamos o Knex, que mistura JavaScript com SQL.
   - Exemplo:
     ```javascript
     // Knex Query Builder
     knex('users').where('id', 1);
     // SQL equivalente
     SELECT * FROM users WHERE id = 1;
     ```

3. **ORM (Object-Relational Mapping)**:
   - Ferramenta que permite mapear, gerenciar e interagir com o banco de dados usando uma abordagem orientada a objetos, abstraindo operações de banco de dados em objetos, métodos e propriedades.
   - Exemplo:
     ```javascript
     // Usando um ORM como Sequelize
     User.findOne({ where: { id: 1 } });
     // SQL equivalente
     SELECT * FROM users WHERE id = 1;
     ```

### Resumo das Abordagens

- **Drivers Nativos**: Baixo nível, comunicação direta com o banco de dados usando SQL puro.
- **Query Builder (Knex)**: Combina JavaScript e SQL para facilitar a escrita de queries.
- **ORM**: Abstração orientada a objetos para interação com o banco de dados, minimizando a necessidade de escrever SQL diretamente.

### Migrations

Mecanismo para gerenciar a evolução da estrutura do banco de dados ao longo do tempo, permitindo aplicar, rastrear e reverter mudanças no esquema de maneira controlada e versionada.

### Pirâmide de Testes

Estratégia baseada em ter mais testes unitários e menos testes de integração e e2e (end-to-end), pois testes unitários são mais rápidos e fáceis de escrever e manter.

#### Testes Unitários

Testes que validam o comportamento de uma única unidade de código, como uma função ou método, garantindo que cada parte da aplicação funcione corretamente sem depender de outras partes.

#### Testes de Integração

Testes que validam a integração entre várias partes da aplicação, como a camada de banco de dados e a camada de serviço, garantindo que a aplicação funcione corretamente como um todo.

#### Testes e2e (end-to-end)

Testes que validam o comportamento da aplicação como um todo, simulando a interação do usuário, garantindo que a aplicação funcione corretamente em todos os níveis, desde a interface até o banco de dados.
