# Jitterbit
API simples para gerenciar pedidos (CRUD) usando Node.js, Express e MongoDB (Mongoose).


Swagger: https://andreverasfernandes.github.io/JitterbitSwagger/


**Endpoints principais**
- **POST `/order`**: criar novo pedido
- **GET `/order/:orderId`**: obter pedido por número
- **GET `/order/list`**: listar todos os pedidos
- **PUT `/order/:orderId`**: atualizar pedido
- **DELETE `/order/:orderId`**: deletar pedido

**Estrutura do projeto**
```
/src
│   app.js
│   package.json
|   package-lock.json
│
├── config
│     └── database.js           
│
├── models
│     └── order.js             
│
├── controllers
│     └── orderController.js   
│
└── routes
      └── orderRoutes.js       
```

**Formato de entrada (exemplo para criação)**

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    { "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 }
  ]
}
```

O payload é mapeado e salvo no MongoDB com o formato:

```json
{
  "orderId": "v10089015vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [ { "productId": 2434, "quantity": 1, "price": 1000 } ]
}
```

**Instalação e execução**

- **Pré-requisitos**: `Node.js` e um MongoDB acessível (local ou Atlas).
- Crie um arquivo `.env` com, por exemplo:

```
MONGO_URI=mongodb://localhost:27017/jitterbit
JWT_SECRET=uma_chave_secreta
TEST_USER=admin
TEST_PASS=password
```

Instale e execute:

```bash
npm install
npm run dev    # ou npm start
```

**Testando as rotas**

O servidor por padrão roda em `http://localhost:3000`.

1) Autenticação (público)

- **Login** — `POST /auth/login`

```bash
curl -i -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

Resposta de sucesso retorna JSON com `token` JWT.

2) Rotas protegidas (exigem header `Authorization: Bearer <token>`)

Substitua `<TOKEN>` pelo JWT recebido no login 

Exemplos `curl`:

- **Listar pedidos** — `GET /order/list`

```bash
curl -i -X GET http://localhost:3000/order/list \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Accept: application/json"
```

- **Criar pedido** — `POST /order`

```bash
curl -i -X POST http://localhost:3000/order \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"numeroPedido":"unique123-01","valorTotal":150.5,"dataCriacao":"2025-12-02T12:00:00Z","items":[{"idItem":"10","quantidadeItem":2,"valorItem":75.25}]}'
```

- **Obter pedido** — `GET /order/:orderId` (ex.: `test123`)

```bash
curl -i -X GET http://localhost:3000/order/test123 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Accept: application/json"
```

- **Atualizar pedido** — `PUT /order/:orderId`

```bash
curl -i -X PUT http://localhost:3000/order/test123 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"valorTotal":200,"dataCriacao":"2025-12-02T12:00:00Z","items":[{"idItem":"10","quantidadeItem":3,"valorItem":66.66}]}'
```

- **Deletar pedido** — `DELETE /order/:orderId`

```bash
curl -i -X DELETE http://localhost:3000/order/test123 \
  -H "Authorization: Bearer <TOKEN>"
```

**Observações**


- As rotas de `order` são protegidas pelo middleware `src/middleware/auth.js`.
