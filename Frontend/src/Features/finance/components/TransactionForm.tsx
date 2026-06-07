import React, { useState } from 'react';
import { type Transaction } from '../../../types';

// 1. Definimos el molde de lo que este componente NECESITA recibir desde afuera (Props)
interface TransactionFormProps {
  onAddTransaction: (nuevaTransaccion: Transaction) => void;

}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  // Estados internos del formulario
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('gasto');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación con Early Return
    if (!descripcion || !monto || Number(monto) === 0) return;

    const nuevaTransaccion: Transaction = {
      id: Date.now().toString(),
      description: descripcion,
      amount: Number(monto),
      category: 'General',
      date: new Date().toISOString().split('T')[0],
      type: tipo
    };

    // Ejecución de la función que recibe del padre
    onAddTransaction(nuevaTransaccion);

    // Limpiamos los inputs locales
    setDescripcion('');
    setMonto('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <h3>Agregar Nuevo Movimiento</h3>
      
      <input 
        type="text" 
        placeholder="Ej: Almuerzo"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <input 
        type="number" 
        placeholder="Monto ($)"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <select 
        value={tipo} 
        onChange={(e) => setTipo(e.target.value as 'ingreso' | 'gasto')}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="gasto">Gasto 🔴</option>
        <option value="ingreso">Ingreso 🟢</option>
      </select>

      <button type="submit" style={{
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        Guardar Movimiento
      </button>
    </form>
  );
};