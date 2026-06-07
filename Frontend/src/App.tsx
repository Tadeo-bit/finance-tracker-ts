import { useState } from 'react';
import { type Transaction } from './types';
import { calcularBalance, calcularTotalIngresos, calcularTotalGastos } from './Features/finance/utils/financeHelpers';
import { Header } from './Components/layout/Header';
import { TransactionForm } from './Features/finance/components/TransactionForm';
import { TransactionList } from './Features/finance/components/TransactionList';
import { BalanceBoard } from './Features/finance/components/BalanceBoard';

// FUNDAMENTO DE ARRAYS: Creamos un array de objetos llamado MOCK_TRANSACTIONS.
// Al ponerle ': Transaction[]', le estamos diciendo a TS: 
// "Este array SOLO puede contener objetos que cumplan con la interface Transaction".
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    category: 'Sueldo',
    description: 'Desarrollo Frontend Freelance',
    date: '2026-05-01',
    type: 'ingreso'
  },
  {
    id: '2',
    amount: 1300,
    category: 'Comida',
    description: 'Compra de café y medialunas',
    date: '2026-05-15',
    type: 'gasto'
  }
];


function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  
  // Tus funciones puras intactas con sus variables
  const balanceActual = calcularBalance(transactions);
  const ingresosTotales = calcularTotalIngresos(transactions);
  const gastosTotales = calcularTotalGastos(transactions);

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      <Header />
      <h1>Finance Tracker 🚀</h1>
      <p>Modo Aprendizaje: Fundamentos de JS + TS</p>
      
      {/* 1. EL HIJO QUE TE PIDE EL WALKIE-TALKIE (Hijo -> Padre) */}
      <TransactionForm 
          onAddTransaction={(nueva) => setTransactions([...transactions, nueva])} 
      />

      <hr />
      
      {/* 2. NUEVO COMPONENTE: REEMPLAZA TU SECTION VIEJO (Padre -> Hijo) */}
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