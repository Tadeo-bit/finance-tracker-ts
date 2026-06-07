import React from 'react';

// El molde se adapta a tus nombres
interface BalanceBoardProps {
  balanceActual: number;
  ingresosTotales: number;
  gastosTotales: number;
}

export const BalanceBoard: React.FC<BalanceBoardProps> = ({ balanceActual, ingresosTotales, gastosTotales }) => {
  return (
    <section style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      
      {/* BALANCE TOTAL */}
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', flex: 1 }}>
        <h3>Balance Total</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: balanceActual >= 0 ? 'green' : 'red' }}>
          ${balanceActual}
        </p>
      </div>
      
      {/* INGRESOS */}
      <div style={{ background: '#e6f4ea', padding: '15px', borderRadius: '8px', flex: 1 }}>
        <h3 style={{ color: 'green' }}>Ingresos</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'green' }}>
          +${ingresosTotales}
        </p>
      </div>
      
      {/* GASTOS */}
      <div style={{ background: '#fce8e6', padding: '15px', borderRadius: '8px', flex: 1 }}>
        <h3 style={{ color: 'red' }}>Gastos</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'red' }}>
          -${gastosTotales}
        </p>
      </div>

    </section>
  );
};