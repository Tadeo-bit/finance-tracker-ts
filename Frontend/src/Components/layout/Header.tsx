import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#1e293b', // Un azul oscuro muy profesional
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* 1. SECTOR LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>🎯</span>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>FinanzApp</h2>
      </div>

      {/* 2. SECTOR NAVEGACIÓN (Futuro Router) */}
      <nav style={{ display: 'flex', gap: '20px' }}>
        <a href="#dashboard" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '500' }}>Dashboard</a>
        <a href="#reportes" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>Reportes</a>
      </nav>

      {/* 3. SECTOR AUTENTICACIÓN (Preparado para el Backend) */}
      <div>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
        onClick={() => alert('Próximamente: Conexión con el Backend de Login 🚀')}
        >
          Iniciar Sesión
        </button>
      </div>
    </header>
  );
};