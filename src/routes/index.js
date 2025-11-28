const express = require('express');
const router = express.Router();

// rota raiz da API
router.get('/', (req, res) => res.json({ message: 'API running' }));

module.exports = router;
