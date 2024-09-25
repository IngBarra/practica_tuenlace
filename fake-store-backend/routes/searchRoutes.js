const express = require('express');
const router = express.Router();
const { addSearch, getSearches } = require('../controllers/searchController');

// Ruta para agregar una búsqueda
router.post('/search', addSearch);

// Ruta para obtener todas las búsquedas
router.get('/searches', getSearches);

module.exports = router;
