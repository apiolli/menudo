# FinCore — Sistema de Registro y Análisis de Gastos Personales

Aplicación web full-stack para registrar, categorizar, analizar y exportar gastos personales, construida con arquitectura **Onion** en el backend y un frontend moderno que consume una API REST autenticada con **JWT**.

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Contexto del Sistema](#contexto-del-sistema)
- [Pantallas del Frontend](#pantallas-del-frontend)
- [Requisitos Técnicos del Frontend](#requisitos-técnicos-del-frontend)
- [Arquitectura del Backend](#arquitectura-del-backend)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Roadmap / Mejoras Futuras](#roadmap--mejoras-futuras)

---

## Descripción General

FinCore permite a cada usuario administrar sus finanzas personales de forma independiente: registrar gastos, organizarlos por categorías y métodos de pago, definir presupuestos mensuales, visualizar reportes con gráficos comparativos y exportar la información en distintos formatos (PDF, Excel, CSV/TXT/JSON).

El sistema evalúa buenas prácticas profesionales de desarrollo: separación de responsabilidades, uso de DTOs, repositorios, inyección de dependencias, validaciones robustas y manejo de errores consistente entre backend y frontend.

---

## Contexto del Sistema

- Cada usuario se autentica mediante JWT y **solo puede ver, crear, editar y eliminar sus propios datos**.
- **Entidades principales:** Usuario, Gasto, Categoría, Método de Pago (y Presupuesto como entidad de soporte).
- El sistema permite:
  - Registrar y categorizar gastos.
  - Analizar el comportamiento del gasto mediante reportes y gráficos.
  - Exportar reportes en **PDF, Excel y CSV/JSON**.
  - Controlar presupuestos por categoría con alertas de consumo (50%, 80%, 100%).

---

## Pantallas del Frontend

| #   | Pantalla                       | Descripción                                                                                                                                         |
| --- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Login y Registro**           | Autenticación de usuario con validaciones de formulario y manejo de errores de credenciales.                                                        |
| 2   | **Dashboard Principal**        | Resumen del mes actual: total gastado, distribución por categoría (gráfico de torta/barras), últimos movimientos y comparación con el mes anterior. |
| 3   | **Listado de Gastos**          | Tabla/lista con filtros (fecha, categoría, método de pago), búsqueda, paginación y acciones de crear/editar/eliminar.                               |
| 4   | **Formulario de Gasto**        | Alta y edición de gastos: monto, fecha, descripción, categoría (select) y método de pago (select).                                                  |
| 5   | **Gestión de Categorías**      | CRUD en formato lista o tarjetas, con color e ícono representativo por categoría.                                                                   |
| 6   | **Gestión de Métodos de Pago** | CRUD similar a categorías (efectivo, tarjeta, transferencia, etc.).                                                                                 |
| 7   | **Reportes y Análisis**        | Filtros por rango de fechas/categoría, gráficos comparativos (líneas, barras, torta) y tabla de detalle.                                            |
| 8   | **Exportación**                | Modal/botón para exportar reportes en PDF, Excel o CSV, con selección de rango de fechas.                                                           |
| 9   | **Perfil de Usuario**          | Datos básicos del usuario y cambio de contraseña.                                                                                                   |
| 10  | **Estados de UI**              | Estados vacíos, loading (skeletons) y manejo visual de errores (sesión expirada, error de red, validaciones).                                       |

---

## Requisitos Técnicos del Frontend

- **Navegación clara:** sidebar o navbar con acceso directo a Dashboard, Gastos, Categorías, Métodos de Pago, Reportes y Perfil.
- **Componentes reutilizables:**
  - Inputs (texto, número, fecha, select) con validación en línea.
  - Botones primarios/secundarios/destructivos consistentes.
  - Tablas con paginación, ordenamiento y filtros reutilizables.
  - Tarjetas (cards) para categorías, métodos de pago e indicadores del dashboard.
  - Modales para confirmaciones, formularios rápidos y exportación.
  - Componentes de gráficos (torta, barras, líneas) parametrizables.
  - Skeletons/spinners para estados de carga.
  - Toasts/alerts para feedback de éxito y error.
- **Manejo de estado:** autenticación persistente (token JWT), estado global para usuario y datos de sesión.
- **Consumo de API REST:** capa de servicios centralizada para llamadas HTTP, manejo de errores del backend y expiración de sesión.
- **Responsive design:** adaptable a escritorio, tablet y móvil.
- **Accesibilidad básica:** contraste adecuado, navegación por teclado, etiquetas ARIA en formularios.
- **Validaciones en frontend** espejadas con las del backend (montos positivos, fechas válidas, campos obligatorios).

---

## Arquitectura del Backend

El backend implementa **arquitectura Onion**, separando el sistema en capas independientes:

```
┌─────────────────────────────────────┐
│         API (Controladores)          │  ← Sin lógica de negocio
├─────────────────────────────────────┤
│      Infraestructura (EF Core)       │  ← Persistencia, repositorios
├─────────────────────────────────────┤
│         Aplicación (Servicios)       │  ← Lógica de negocio, DTOs
├─────────────────────────────────────┤
│         Dominio (Entidades)          │  ← Independiente de todo lo demás
└─────────────────────────────────────┘
```

**Principios aplicados:**

- Repositorios e interfaces para acceso a datos.
- DTOs de entrada y salida (nunca se exponen entidades directamente).
- Inyección de dependencias en todas las capas.
- Controladores limpios, delegando la lógica a los servicios.
- Manejo global de excepciones con respuestas JSON consistentes.

---

## Stack Tecnológico

**Backend**

- .NET / ASP.NET Core Web API
- Entity Framework Core
- JWT para autenticación
- Swagger / OpenAPI

**Frontend**

- Framework SPA (React / Angular / Vue — según implementación)
- Consumo de API REST vía servicios HTTP centralizados
- Librería de gráficos (ej. Chart.js, Recharts o similar)
- Gestión de estado global (Context API, Redux, o equivalente)

**Base de Datos**

- SQL Server / PostgreSQL (según configuración del proyecto)

**Infraestructura**

- Docker / Docker Compose para contenedores de backend, base de datos y frontend

---

## Estructura del Proyecto

```
FinCore/
├── backend/
│   ├── FinCore.API/            # Controladores, configuración, middlewares
│   ├── FinCore.Application/    # Servicios, DTOs, interfaces
│   ├── FinCore.Domain/         # Entidades y lógica de dominio
│   └── FinCore.Infrastructure/ # EF Core, repositorios, persistencia
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes reutilizables (inputs, tablas, modales, cards)
│   │   ├── pages/               # Pantallas: Dashboard, Gastos, Categorías, Reportes, Perfil
│   │   ├── services/             # Capa de consumo de API REST
│   │   ├── context/ | store/     # Manejo de estado global
│   │   └── assets/               # Íconos, estilos, imágenes
├── docker-compose.yml
└── README.md
```

---

## Instalación y Ejecución

### Requisitos previos

- .NET SDK 8+
- Node.js 18+
- Docker y Docker Compose (opcional, recomendado)

### Con Docker Compose

```bash
docker-compose up --build
```

### Manual

**Backend**

```bash
cd backend/FinCore.API
dotnet restore
dotnet ef database update
dotnet run
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

La API quedará disponible en `https://localhost:5001` (Swagger en `/swagger`) y el frontend en `http://localhost:3000` (o el puerto configurado).

---

## Roadmap / Mejoras Futuras

- [ ] Auditoría de entidades (`CreatedAt`, `UpdatedAt`)
- [ ] Soft delete en categorías, métodos de pago y gastos
- [ ] Paginación y ordenamiento avanzado en listados
- [ ] Refresh token para sesiones prolongadas
- [ ] Gastos recurrentes automáticos
- [ ] Adjuntar comprobante (imagen/PDF) a cada gasto
- [ ] Notificaciones proactivas de presupuesto
- [ ] Comparación de tendencias multi-mes en el dashboard
- [ ] Tests unitarios (xUnit + Moq)
- [ ] Logging estructurado (Serilog)
- [ ] Exportación a PDF con formato de reporte

---

## Licencia

Proyecto académico — Programación III.
