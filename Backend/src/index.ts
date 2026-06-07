import express from 'express';

// 1. Inicializamos la aplicación de Express
const app = express();

// 2. Definimos el puerto donde va a escuchar nuestro servidor
const PORT = 3000;

// 3. Creamos nuestra primera RUTA (URL). 
// Cuando alguien entre a la raíz de nuestro servidor, le respondemos un texto.
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! Mi primer servidor Backend oficial de FinanzApp 🚀');
});

// Nueva ruta para consultar el estado del sistema en formato JSON
app.get('/api/status', (req, res) => {
  res.json({
    status: "online",
    message: "El backend de FinanzApp está respondiendo perfectamente",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// 4. Le decimos al servidor que empiece a escuchar los pedidos en el puerto elegido
app.listen(PORT, () => {
  console.log(`⚡️ [server]: Servidor corriendo en http://localhost:${PORT}`);
});