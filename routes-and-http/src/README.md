# Routes and HTTP
Api rest utilizano Fastify, knex e typescript.

# Sobre a Aplicação
Api para um aplicativo de controle de finanças

## Requisitos Funcionais
- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações feitas;
- [x] O usuário deve poder visualizar uma transação em especifico;

## Regras de Negocios
- [x] A transação pode ser do tipo crédito que somará ao valor total, ou déibito que iria subtrair;
- [ ] Deve ser possivel identificarmos o usuário entre as requisições (Não teremos autenticaçãor por isso é importante identificar o usuário);
- [ ] O usuário só poderá visualizar as transações criada por ele;

## Requisitos não funcionais



# Como testar
Estamos usando o plugin Rest Client do vscode para documentar nossas request.
Basta instalar o plugin e acessar a pasta requests e utilizar os metodos documentos dentro dela.
# Aprendizados
### Banco de Dado: SQLite
Utilizamos o SQLite porque, além de ser um banco relacional, é muito leve e não precisamos de um servidor separado para utilizá-lo. Todos os dados do SQLite são salvos em um único arquivo físico que fica dentro do nosso projeto. Outra vantagem é que não precisamos configurar nada, tornando ainda mais fácil de implementar.

Um ponto importante de estarmos usando o SQLite é que, além de tudo que foi dito acima, todas as queries são extremamente semelhantes a outros bancos de dados relacionais que utilizem sql, possibilitando a migração da aplicação e a reutilização de toda a base de conhecimento.


### Comunicação com o Banco de dados: Knex

Existem diversas estratégias de conexão com nosso banco de dados. As três formas mais comuns são:

1. **Drivers Nativos**:
   - Drivers Nativos são ferramentas/libs de baixo nível que nos permitem comunicar com o banco de dados de maneira mais "crua", executando as queries em SQL da maneira menos abstrata possível, em um nível mais baixo possível.
   - Exemplo:
     ```sql
     SELECT * FROM table;
     ```

2. **Query Builder**:
   - Um Query Builder é uma ferramenta que facilita a escrita de queries SQL utilizando a linguagem escolhida. No nosso caso, utilizamos o Knex, que mistura código JavaScript com SQL, evitando que escrevamos queries de forma crua e focando na linguagem.
   - Exemplo:
     ```javascript
     // Knex Query Builder
     knex('users').where('id', 1);
     // SQL equivalente
     SELECT * FROM users WHERE id = 1;
     ```

3. **ORM (Object-Relational Mapping)**:
   - Um ORM é uma ferramenta que permite mapear, gerenciar e interagir com o banco de dados usando uma abordagem orientada a objetos. Ele abstrai as operações de banco de dados em objetos, métodos e propriedades, facilitando a manipulação dos dados sem precisar escrever SQL diretamente.
   - Exemplo:
     ```javascript
     // Usando um ORM como Sequelize
     User.findOne({ where: { id: 1 } });
     // SQL equivalente
     SELECT * FROM users WHERE id = 1;
     ```

### Resumo das Abordagens:

- **Drivers Nativos**: Baixo nível, comunicação direta com o banco de dados usando SQL puro.
- **Query Builder (Knex)**: Combina JavaScript e SQL para facilitar a escrita de queries e precisa de uma certa forma semelhante ao sql.
- **ORM**: Abstração orientada a objetos para interação com o banco de dados, minimizando a necessidade de escrever SQL diretamente.

### Migrations
É o mecanismo para gerenciar a evolução da estrutura do banco de dados ao longo do tempo. Elas permitem aplicar, rastrear e reverter mudanças no esquema do banco de dados de maneira controlada e versionada.

### Pirâmide de testes
A pirâmide de testes é uma estratégia que se baseia em ter mais testes unitários e menos testes de integração e e2e, pois testes unitários são mais rápidos e fáceis de escrever e manter do que outros tipos de testes.

#### Testes unitários
Testes unitários são testes que validam o comportamento de uma única unidade de código, como uma função ou método. Eles são úteis para garantir que cada parte da aplicação esteja funcionando corretamente, sem depender de outras partes.
#### Testes de integração

Testes de integração são testes que validam a integração entre várias partes da aplicação, como a integração entre a camada de banco de dados e a camada de serviço. Eles são importantes para garantir que a aplicação esteja funcionando corretamente como um todo.

#### Testes e2e (end-to-end)
Testes e2e (end-to-end) são testes que validam o comportamento da aplicação como um todo, simulando a interação do usuário com a aplicação. Eles são importantes para garantir que a aplicação esteja funcionando corretamente em todos os níveis, desde a camada de interface até a camada de banco de dados.


# Tecnologias

- Typescript
- Eslint
- Tsx
- Sqlite
- Migrations
- REST Client (plugin vscode)
- Vitest
- supertest