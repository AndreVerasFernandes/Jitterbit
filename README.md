# Jitterbit
API simples para gerenciar pedidos (CRUD) usando Node.js, Express e MongoDB (Mongoose).

Endpoints principais
- POST `/order` - criar novo pedido (obrigatório)
- GET `/order/:orderId` - obter pedido por número (obrigatório)
- GET `/order/list` - listar todos os pedidos
- PUT `/order/:orderId` - atualizar pedido
- DELETE `/order/:orderId` - deletar pedido



```
/src
│   app.js
│   package.json
|   package-lock.json
│   .env
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

Formato de entrada (exemplo recebido pela API na criação):

```
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

```
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [ { "productId": 2434, "quantity": 1, "price": 1000 } ]
}
```

Instalação e execução

Node.js instalado
MongoDB rodando (local ou remoto — Atlas, por exemplo)

1. Crie um arquivo `.env` com a variável `MONGO_URI` e configure a URI do MongoDB (padrão abaixo).


2. Instale dependências e execute:

```bash
npm install
npm run dev    # ou npm start
```

Exemplo de request com curl (criar pedido):

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [ { "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 } ]
}'
```

Observações



