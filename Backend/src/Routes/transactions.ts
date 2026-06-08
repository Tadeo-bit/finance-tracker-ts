import { Router, Request, Response } from 'express';

const router = Router();

// Estado inicial simulado (igual que en tu Frontend)
// Esto nos sirve como base de datos temporal en memoria
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'ingreso' | 'gasto';
}

const initialTransactions: Transaction[] = [
  { id: '1', description: 'Desarrollo Frontend Freelance', amount: 5000, type: 'ingreso' },
  { id: '2', description: 'Compra de café y medialunas', amount: 1300, type: 'gasto' }
];

// Endpoint para OBTENER todos los movimientos
// Cuando golpeen acá, respondemos con el array completo en formato JSON
router.get('/', (req: Request, res: Response) => {
  res.json(initialTransactions);
});

// Endpoint para CREAR un nuevo movimiento
router.post('/', (req: Request, res: Response) => {
  const { description, amount, type } = req.body;

  // Validación básica de campos obligatorios
  if (!description || amount === undefined || !type) {
    return res.status(400).json({ 
      message: 'Faltan campos obligatorios: description, amount o type.' 
    });
  }

  const newTransaction: Transaction = {
    id: Date.now().toString(), // Generación simple de ID
    description,
    amount: Number(amount),
    type
  };

  // "Guardamos" en nuestro array temporal
  initialTransactions.push(newTransaction);

  // Respondemos con el objeto creado y estatus 201 (Created)
  res.status(201).json(newTransaction);
});

export default router;