# 💰 FinanzTracker - Gestor de Finanzas Personales

> ⚠️ **PROYECTO EN DESARROLLO** (Iniciado el 18 de mayo de 2026). Actualmente en etapa de prototipado inicial y configuración de arquitectura Fullstack.

FinanzTracker es una aplicación para el control de ingresos, gastos y balances. Está estructurada como un **monorepositorio** que separa estrictamente el cliente (`Frontend`) del servidor (`Backend`).

🚀 **Link del Frontend en vivo:** [https://finance-tracker-ts-one.vercel.app/](https://finance-tracker-ts-one.vercel.app/)

---

## 🏗️ Estado Actual y Arquitectura

### 💻 Frontend (React + TypeScript + Vite)
* **Arquitectura:** Datos centralizados en una *Fuente de Verdad Única* (`useState`). Los cálculos de balances se procesan mediante *funciones puras* y estructuras de datos tipadas con `interfaces` de TypeScript.
* **Estilos:** Renderizados temporalmente mediante **estilos en línea (inline styles)** para agilizar el desarrollo lógico. Se migrará a CSS por componentes en la próxima fase.
* **Persistencia:** Sin persistencia actual (datos volátiles en memoria). Aspira a conectarse a la API de forma definitiva.

### ⚙️ Backend (Node.js + Express + TypeScript)
* **Servidor Local:** Montado en el puerto `3000` con soporte para ES Modules mediante el modo *watch* de `tsx`.
* **API REST Inicial:** Cuenta con dos endpoints de prueba funcionales:
  * `GET /`: Validación de conectividad básica (Texto plano).
  * `GET /api/status`: Simulación de respuesta de datos en formato **JSON** (Estado, versión y marca de tiempo).

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React.js, TypeScript, Vite, Estilos en línea.
* **Backend:** Node.js, Express, TypeScript, TSX.
* **Despliegue:** Vercel (Frontend).

---

## 🚀 Cómo ejecutar el proyecto en Local

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
2. Levantar el Frontend (Cliente)
Bash
cd Frontend
npm install
npm run dev
Disponible en: http://localhost:5173

3. Levantar el Backend (Servidor)
Bash
cd Backend
npm install
npx tsx --watch src/index.ts
Disponible en: http://localhost:3000/api/status