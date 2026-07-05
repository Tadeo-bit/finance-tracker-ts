import React from 'react';
import { type Transaction } from '../../../types';
import { useState } from 'react';

// 1. El molde: Este componente EXIGE recibir un array de transacciones desde el padre
interface TransactionListProps {
  listado: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (id: string, updatedData: Omit<Transaction, 'id'>) => Promise<void>;
}

export const TransactionList: React.FC<TransactionListProps> = ({ listado, onDeleteTransaction, onEditTransaction }) => {
  
// Este estado guarda el ID de la transacción que se está editando, o null si ninguna se está editando
const [editingId, setEditingId] = useState<string | null>(null);

// Estos estados guardan temporalmente lo que el usuario escribe mientras edita
const [editDescription, setEditDescription] = useState('');
const [editAmount, setEditAmount] = useState('');
 
// La función que activa el "Modo Edición"
const startEditing = (transaction: Transaction) => {
  setEditingId(transaction.id);
  setEditDescription(transaction.description);
  setEditAmount(transaction.amount.toString());
};

// La función que guarda los cambios
const handleSave = async (id: string, originalType: string, originalCategory: string, originalDate: string) => {
  // Llamamos a la prop que viaja desde App, pasándole el ID y los datos modificados
  await onEditTransaction(id, {
    description: editDescription,
    amount: Number(editAmount),
    type: originalType as 'ingreso' | 'gasto',
    category: originalCategory,
    date: originalDate
  });
  // Una vez guardado, reseteamos el ID a null para cerrar el formulario
  setEditingId(null);
};

  return (
  <div style={{ marginTop: '20px' }}>
    <h3>Historial de Movimientos</h3>
    
    {/* Si no hay transacciones, mostramos un mensaje amistoso */}
    {listado.length === 0 ? (
      <p style={{ color: '#64748b', fontStyle: 'italic' }}>No hay movimientos registrados aún.</p>
    ) : (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {listado.map((t) => (
          <li 
            key={t.id} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center', // Alinea el texto y el botón al centro verticalmente
              padding: '10px',
              marginBottom: '8px',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              borderLeft: t.type === 'ingreso' ? '5px solid #22c55e' : '5px solid #ef4444',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            {/* Izquierda: Descripción */}
            <span>{t.description}</span>
            
            {/* Derecha: Agrupamos el Monto y el Botón de eliminar en un contenedor flex */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontWeight: 'bold', color: t.type === 'ingreso' ? '#22c55e' : '#ef4444' }}>
                {t.type === 'ingreso' ? '+' : '-'} ${t.amount}
              </span>
              
              <button 
                onClick={() => onDeleteTransaction(t.id)}
                style={{ 
                  backgroundColor: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
)};