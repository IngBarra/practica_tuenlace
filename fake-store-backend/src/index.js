require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar cors


const app = express();

// Cargar la variable de conexión de MongoDB desde el archivo .env
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('No se pudo conectar a MongoDB:', err));

// Middleware y rutas
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000' // Permitir solo solicitudes desde este origen
}));

const searchRoutes = require('../routes/searchRoutes');
app.use('/api', searchRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
