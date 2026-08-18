import { useState, useEffect } from 'react';
import { type Transaction } from './types';
import { calcularBalance, calcularTotalIngresos, calcularTotalGastos } from './Features/finance/utils/financeHelpers';
import { Header } from './Components/layout/Header';
import { TransactionForm } from './Features/finance/components/TransactionForm';
import { TransactionList } from './Features/finance/components/TransactionList';
import { BalanceBoard } from './Features/finance/components/BalanceBoard';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('TODOS');

  const filteredTransactions = selectedMonth === 'TODOS'
  ? transactions
  : transactions.filter((t) => t.date.startsWith(selectedMonth));

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

  const handleDeleteTransaction = async (id: string) => {
    try {
      // 1. Le pegamos al endpoint DELETE que creamos en Express
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar la transacción en el servidor');
      }

      // 2. Si el servidor respondió OK (200), limpiamos la pantalla al instante con el filtro
      setTransactions((prevTransactions) => 
        prevTransactions.filter(t => t.id !== id)
      );

    } catch (error) {
      console.error('Error al borrar:', error);
      alert('Hubo un error al intentar borrar el movimiento.');
    }
  };

  const handleEditTransaction = async (id: string, updatedData: Omit<Transaction, 'id'>) => {
  try {
    // 1. Mandamos la petición PUT al servidor con el ID en la URL
    // Y le pasamos en el "body" el objeto con los datos modificados convertidos a texto JSON
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Avisamos al servidor que le mandamos un JSON
      },
      body: JSON.stringify(updatedData), 
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar la transacción en el servidor');
    }

    const data = await response.json();
    // Aquí el servidor nos devuelve un objeto que tiene la propiedad .transaction con el movimiento ya editado

    // 2. Lógica de estado: Buscamos en nuestro estado de React la transacción vieja y la reemplazamos por la nueva
    setTransactions((prevTransactions) =>
      prevTransactions.map((t) => (t.id === id ? data.transaction : t))
    );

  } catch (error) {
    console.error('Error al editar:', error);
    alert('Hubo un error al intentar guardar los cambios.');
  }
  };

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

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e2e8f0', borderRadius: '8px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filtrar por Mes:</label>
      <select 
          value={selectedMonth} 
           onChange={(e) => setSelectedMonth(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
      >
          <option value="TODOS">Ver Todo el Historial 📅</option>
          <option value="2026-01">Enero 2026</option>
          <option value="2026-02">Febrero 2026</option>
          <option value="2026-03">Marzo 2026</option>
          <option value="2026-04">Abril 2026</option>
          <option value="2026-05">Mayo 2026</option>
          <option value="2026-06">Junio 2026</option>
          <option value="2026-07">Julio 2026</option>
          <option value="2026-08">Agosto 2026</option>
          <option value="2026-09">Septiembre 2026</option>
          <option value="2026-10">Octubre 2026</option>
          <option value="2026-11">Noviembre 2026</option>
          <option value="2026-12">Diciembre 2026</option>
      </select>
      </div>
      
      {/* 3. EL HIJO QUE RECIBE LA LISTA VIVA (Padre -> Hijo) */}
      <TransactionList 
        listado={filteredTransactions}
        onDeleteTransaction={handleDeleteTransaction}
        onEditTransaction={handleEditTransaction}
      />
      
    </main>
  );
}

export default App;