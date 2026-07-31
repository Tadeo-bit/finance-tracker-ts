# 💰 FinanzTracker - Gestor de Finanzas Personales

> ⚠️ **PROYECTO EN DESARROLLO** (Iniciado el 18 de mayo de 2026). Actualmente consolidando las bases de la arquitectura Fullstack e Integración Continua (CI/CD).

FinanzTracker es una aplicación robusta para el control de ingresos, gastos y balances financieros personales. Está estructurada de forma modular, separando estrictamente la interfaz de usuario (`Frontend`) de la lógica del servidor (`Backend`).

🚀 **Link de la Aplicación en vivo (Frontend):** [https://finance-tracker-ts-one.vercel.app/](https://finance-tracker-ts-one.vercel.app/)

---

## 🏗️ Estado Actual y Arquitectura

### 💻 Frontend (React + TypeScript + Vite)
* **Estado:** Desplegado de forma continua en **Vercel**.
* **Gestión de Estado:** Centralizado en `App.tsx` (*State Lifting*) actuando como Fuente de Verdad Única. Los componentes hijos se comunican mediante paso de funciones tipadas como propiedades (*Props*).
* **Consumo de API:** Comunicación asíncrona mediante `fetch` integrada con **Variables de Entorno (`VITE_API_URL`)** para alternar automáticamente entre desarrollo local y producción.
* **Lógica de Datos:** El balance actual, ingresos y gastos totales se calculan dinámicamente mediante *funciones puras de orden superior* aisladas en un módulo de utilidades (`utils/financeHelpers.ts`).
* **Estilos:** Renderizados temporalmente mediante **estilos en línea (inline styles)** para priorizar el desarrollo de la lógica de negocio. Se migrará a estilos modulares en la Etapa 2.

### ⚙️ Backend (Node.js + Express + TypeScript)
* **Estado:** Desplegado de forma continua en **Render** con recarga automática vinculada a GitHub.
* **Seguridad:** Configuración de middleware **CORS dinámico** para restringir el acceso y permitir peticiones únicamente desde el dominio oficial del Frontend y el entorno local.
* **API REST Funcional:** Sistema CRUD inicial completo en memoria que procesa:
  * `GET /api/transactions`: Suministra el listado histórico en formato JSON.
  * `POST /api/transactions`: Recibe e inserta nuevos movimientos validando campos obligatorios.
  * `PUT /api/transactions/:id`: Actualiza quirúrgicamente un movimiento mediante búsqueda de índices (`.findIndex()`) y desestructuración de parámetros y cuerpo (`req.params` y `req.body`).
  * `DELETE /api/transactions/:id`: Remueve movimientos del flujo de datos usando persistencia temporal en servidor.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React.js, TypeScript, Vite.
* **Backend:** Node.js, Express, TypeScript, TSX.
* **Despliegue e Infraestructura:** Vercel (Frontend), Render (Backend).

---

## 🚀 Cómo ejecutar el proyecto en Local

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
2. Levantar el Frontend (Cliente)
Bash
cd Frontend
npm install
# Nota: Crear archivo .env con la variable VITE_API_URL=http://localhost:3000
npm run dev
Disponible en: http://localhost:5173

3. Levantar el Backend (Servidor)
Bash
cd Backend
npm install
npm run dev
Disponible en: http://localhost:3000
