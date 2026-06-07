import { type Transaction } from '../../../types'; 
// Nota: los '../' son para "salir" de las carpetas hasta llegar a types

export const calcularBalance = (transacciones: Transaction[]): number => {
  return transacciones.reduce((acumulado, transaccion) => {
    return transaccion.type === 'ingreso' 
      ? acumulado + transaccion.amount 
      : acumulado - transaccion.amount;
  }, 0);
};

export const calcularTotalIngresos = (transacciones: Transaction[]): number => {
  return transacciones.reduce((acumulado, transaccion) => {
    return transaccion.type === 'ingreso' ? acumulado + transaccion.amount : acumulado;
  }, 0);
};

export const calcularTotalGastos = (transacciones: Transaction[]): number => {
  return transacciones.reduce((acumulado, transaccion) => {
    return transaccion.type === 'gasto' ? acumulado + transaccion.amount : acumulado;
  }, 0);
};