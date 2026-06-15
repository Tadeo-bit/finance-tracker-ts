import { useState, useEffect } from 'react';
import { type Transaction } from './types';
import { calcularBalance, calcularTotalIngresos, calcularTotalGastos } from './Features/finance/utils/financeHelpers';
import { Header } from './Components/layout/Header';
import { TransactionForm } from './Features/finance/components/TransactionForm';
import { TransactionList } from './Features/finance/components/TransactionList';
import { BalanceBoard } from './Features/finance/components/BalanceBoard';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Hook para cargar los datos del backend al montar el componente
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`);
        if (!response.ok) {
          throw new Error('Error al conectar con el servidor');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetch:", error);
      }
    };

    fetchTransactions();
  }, []); 

  // Tus funciones puras intactas con sus variables
  const balanceActual = calcularBalance(transactions);
  const ingresosTotales = calcularTotalIngresos(transactions);
  const gastosTotales = calcularTotalGastos(transactions);

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      <Header />
      {/* CABECERA DE LA APP */}
    <div style={{ textAlign: 'center', margin: '30px 0', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '900', color: '#1f2937', letterSpacing: '-0.5px' }}>
        Finanz<span style={{ color: '#2563eb' }}>Tracker</span>
      </h1>
      <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
        Gestor de finanzas personales
      </p>
    </div>
      {/* 1. EL HIJO QUE PIDE EL WALKIE-TALKIE (Hijo -> Padre) */}
      <TransactionForm 
          onAddTransaction={(nueva) => setTransactions([...transactions, nueva])} 
      />

      <hr />
      
      {/* 2. NUEVO COMPONENTE: (Padre -> Hijo) */}
      <BalanceBoard 
        balanceActual={balanceActual}
        ingresosTotales={ingresosTotales}
        gastosTotales={gastosTotales}
      />
      
      <hr />
      
      {/* 3. EL HIJO QUE RECIBE LA LISTA VIVA (Padre -> Hijo) */}
      <TransactionList listado={transactions} />
      
    </main>
  );
}

export default App;