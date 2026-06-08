import express from 'express';
import cors from 'cors';
import transactionRoutes from './Routes/transactions.js'; // <-- 1. Importamos las rutas

const app = express();
const PORT = 3000;

// 2. CONFIGURACIÓN DE CORS
// permiso exclusivo a tu puerto del Frontend
app.use(cors({
  origin: 'http://localhost:5173' 
}));

// Middleware para que Express entienda JSON 
app.use(express.json());

// 2. Vincula las rutas con un "prefijo"
// Esto significa que todas las rutas de ese archivo van a empezar con /api/transactions
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola Mundo! Mi primer servidor Backend oficial de FinanzApp 🚀');
});

app.get('/api/status', (req, res) => {
  res.json({
    status: "online",
    message: "El backend de FinanzApp está respondiendo perfectamente",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`⚡️ [server]: Servidor corriendo en http://localhost:${PORT}`);
});