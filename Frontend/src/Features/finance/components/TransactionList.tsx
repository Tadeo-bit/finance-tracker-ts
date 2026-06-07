import React from 'react';
import { type Transaction } from '../../../types';

// 1. El molde: Este componente EXIGE recibir un array de transacciones desde el padre
interface TransactionListProps {
  listado: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ listado }) => {
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
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                borderLeft: t.type === 'ingreso' ? '5px solid #22c55e' : '5px solid #ef4444',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <span>{t.description}</span>
              <span style={{ fontWeight: 'bold', color: t.type === 'ingreso' ? '#22c55e' : '#ef4444' }}>
                {t.type === 'ingreso' ? '+' : '-'} ${t.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};