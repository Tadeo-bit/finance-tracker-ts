// 1. FUNDAMENTO: Tipo de unión. 
// Definimos textualmente las ÚNICAS dos opciones válidas para el tipo de movimiento.
// JavaScript no tiene esto; TypeScript sí.
export type TransactionType = 'ingreso' | 'gasto';

// 2. FUNDAMENTO: La Interface (El Molde)
// Aquí describimos cómo debe ser CADA OBJETO transacción que creemos.
export interface Transaction {
  id: string;          // Usaremos texto para el ID (pensando en el futuro backend)
  amount: number;      // El monto (variables numéricas, fundamentos de JS)
  category: string;    // Ejemplo: 'Comida', 'Sueldo'
  description: string; // Detalle del movimiento
  date: string;        // Fecha en formato texto (ej: '2026-05-21')
  type: TransactionType; // Aquí aplicamos el tipo estricto que creamos arriba
}

