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
  // Inicializamos el estado con la fecha de hoy en formato YYYY-MM-DD para que el input arranque completo por defecto
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);


  const handleSubmit = async (e: React.FormEvent) => { // 1. Agregamos async
    e.preventDefault();

    // Validación con Early Return 
    if (!descripcion || !monto || Number(monto) === 0) return;

    // 2. Armar el objeto SIN ID, con los nombres que espera el Backend en el req.body
    const nuevaTransaccionData = {
      description: descripcion,
      amount: Number(monto),
      category: 'General', // Valor por defecto por ahora
      date: date,
      type: tipo
    };

    try {
      // 3. Datos hacia el Backend (Puerto 3000)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Avisamos que viaja un JSON
        },
        body: JSON.stringify(nuevaTransaccionData) // Convertimos el objeto a texto
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor Backend');
      }

      // 4. El Backend devuelve el objeto oficial con el ID ya puesto
      const transaccionCreada: Transaction = await response.json();

      // 5. Se la pasamos al componente padre para que la dibuje en la pantalla
      onAddTransaction(transaccionCreada);

      // 6. Limpiamos los inputs locales (Solo si el proceso fue exitoso)
      setDescripcion('');
      setMonto('');
      setDate(new Date().toISOString().split('T')[0]);

    } catch (error) {
      console.error("Error táctico al guardar en el Backend:", error);
      alert("No se pudo guardar el movimiento. ¿Prendiste el Backend en la terminal?");
    }
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

       <input 
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{  
        padding: '8px', 
        borderRadius: '4px', 
        border: '1px solid #cbd5e1' 
        }}
        required
      />
      

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