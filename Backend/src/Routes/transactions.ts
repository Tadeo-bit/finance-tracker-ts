import { Router, Request, Response } from 'express';

const router = Router();

// Estado inicial simulado (igual que en Frontend)
// Esto sirve como base de datos temporal en memoria
interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; 
  type: 'ingreso' | 'gasto';
}

let initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1000000,
    category: 'Sueldo',             // 👈 Agregamos esto en el Back
    description: 'Desarrollo Frontend Freelance',
    date: '2026-05-01',             // 👈 Agregamos esto en el Back
    type: 'ingreso'
  },
  {
    id: '2',
    amount: 13000,
    category: 'Comida',             // 👈 Agregamos esto en el Back
    description: 'Compra de café y medialunas',
    date: '2026-05-15',             // 👈 Agregamos esto en el Back
    type: 'gasto'
  }
];

// Endpoint para OBTENER todos los movimientos
// Cuando golpeen acá, respondemos con el array completo en formato JSON
router.get('/', (req: Request, res: Response) => {
  res.json(initialTransactions);
});

// Endpoint para CREAR un nuevo movimiento
router.post('/', (req: Request, res: Response) => {
  const { description, amount, category, type, date } = req.body;

  // Validación básica de campos obligatorios
  if (!description || amount === undefined || !type) {
    return res.status(400).json({ 
      message: 'Faltan campos obligatorios: description, amount o type.' 
    });
  }

  const newTransaction: Transaction = {
    id: Date.now().toString(), 
    category,       
    description,    
    amount: Number(amount),
    type,
    date,
};

  // "Guardamos" en el array temporal
  initialTransactions.push(newTransaction);

  // Respondemos con el objeto creado y estatus 201 (Created)
  res.status(201).json(newTransaction);
});

//Eliminar transacciones 
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Revisamos si existe usando tu array
  const existe = initialTransactions.some(t => t.id === id);

  if (!existe) {
    return res.status(404).json({ error: 'Transacción no encontrada' });
  }

  // Aplicamos la lógica filtrando el array
  initialTransactions = initialTransactions.filter(t => t.id !== id);

  res.status(200).json({ 
    message: 'Transacción eliminada con éxito',
    idEliminado: id 
  });
});

export default router;