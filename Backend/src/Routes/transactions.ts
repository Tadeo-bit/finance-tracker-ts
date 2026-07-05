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

// Método PUT para recibir el ID por la URL y poder editar transacciones
router.put('/:id', (req, res) => {
  // 1. Extraemos el ID de la URL 
  const { id } = req.params;
  
  // 2. Extraemos los datos nuevos que el Frontend nos envía en el "cuerpo" de la petición
  const { description, amount, type, category, date } = req.body;

  // 3. Buscamos el índice (la posición) de la transacción en nuestro array
  const index = initialTransactions.findIndex(t => t.id === id);

  // 4. Validación: Si findIndex devuelve -1, significa que no encontró ese ID
  if (index === -1) {
    return res.status(404).json({ error: 'Transacción no encontrada para editar' });
  }

  // 5. Fundamento de TypeScript: Validamos que no nos manden datos vacíos
  if (!description || !amount || !type || !category || !date ) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (description, amount o type)' });
  }

  // 6. Actualizamos el objeto en el array pisando los valores viejos con los nuevos
  // Mantenemos el mismo ID original
  initialTransactions[index] = {
    id,
    description,
    amount: Number(amount), 
    type,
    category,
    date
  };

  // 7. Respondemos al Frontend que todo salió espectacular y le devolvemos el objeto editado
  res.status(200).json({
    message: 'Transacción actualizada con éxito',
    transaction: initialTransactions[index]
  });
});

export default router;