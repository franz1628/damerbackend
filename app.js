const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, '../dist')));

// Ruta para manejar todas las demás solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Puerto en el que escuchará el servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor Node.js iniciado en el puerto ${port}`);
});