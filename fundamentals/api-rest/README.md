## Criando um API REST com base local.
--------------

<details>
  <summary>Route e Query parameters:</summary>
  
  ### **Route e Query parameters**

  **Query Parameters**: URL Stateful => São enviado na rota e usados para modificam a resposta, mas que muitas vezes não são obrigatórios e não s, como por exemplo: Filtros e Paginação.
    - Exemplo de busca/filtro: ```http://localhost:3333/users?userId=1&name=jonas``` 

  **Route Paramaters**: São parametros não nomeado que são enviado na rota, e que não deve ser passado dados sensiveis.
    - Exemplo: ```http://localhost:3333/users/1```

  **Request Body**: São para envio de informações no corpo da request, não é passado via url e serve para ser usando como por exemplo em forms.
  
</details>


