// server/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Define tus rutas aquí, por ejemplo:
app.get('/api/data', (req, res) => {
    res.json({ mensaje: 'Datos de ejemplo' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
