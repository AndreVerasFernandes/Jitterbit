const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

// Prefixar rotas com /api
app.use('/api', routes);

// Middleware de tratamento de erro
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
