const Search = require('../models/Search');

// Agregar o actualizar búsqueda
const addSearch = async (req, res) => {
  const { productId } = req.body;

  try {
    // Buscar si ya existe el producto en la tabla de búsquedas
    let search = await Search.findOne({ productId });
    
    if (search) {
      // Si ya existe, incrementar el número de búsquedas
      search.searchCount += 1;
    } else {
      // Si no existe, crear un nuevo documento con contador en 1
      search = new Search({ productId, searchCount: 1 });
    }

    // Guardar en la base de datos
    await search.save();
    res.status(200).json(search);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la búsqueda', error });
  }
};

// Obtener todas las búsquedas
const getSearches = async (req, res) => {
    try {
      // Obtener las 5 búsquedas con mayor número de búsquedas
      const searches = await Search.find()
        .sort({ searchCount: -1 }) // Ordenar por searchCount de forma descendente
        .limit(5); // Limitar a 5 resultados
  
      res.status(200).json(searches);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las búsquedas', error });
    }
  };

module.exports = { addSearch, getSearches };
