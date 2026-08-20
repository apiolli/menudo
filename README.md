<div align="center">

# 🧾 Menudo

### Sistema de Registro y Análisis de Gastos Personales

Aplicación web full-stack para registrar, categorizar, analizar y exportar gastos personales, construida con **arquitectura Onion** en el backend y una API REST autenticada con **JWT**.

[![.NET](https://img.shields.io/badge/.NET-10-512BD4?style=flat-square&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-EF_Core-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)
[![License](https://img.shields.io/badge/license-académico-lightgrey?style=flat-square)]()

*Proyecto académico — Programación II, ITLA*

</div>

---

## 📋 Tabla de contenidos

- [📖 Descripción general](#descripción-general)
- [🛠️ Stack tecnológico](#stack-tecnológico)
- [🧱 Arquitectura del backend](#arquitectura-del-backend)
- [📂 Estructura del proyecto](#estructura-del-proyecto)
- [🧩 Módulos y funcionalidades](#módulos-y-funcionalidades)
- [🚀 Instalación y ejecución](#instalación-y-ejecución)
- [🗺️ Roadmap](#roadmap)
- [📄 Licencia](#licencia)

---

## 📖 Descripción general

Menudo permite a cada usuario administrar sus finanzas personales de forma independiente: registrar gastos, organizarlos por categorías y métodos de pago, visualizar un dashboard con reportes, e importar/exportar información en distintos formatos.

El sistema aplica buenas prácticas de desarrollo profesional: separación de responsabilidades por capas, DTOs, repositorios, inyección de dependencias, patrón Strategy para exportación de datos y manejo de errores centralizado.

- Autenticación mediante **JWT**; cada usuario solo puede ver, crear, editar y eliminar sus propios datos.
- **Entidades principales:** `User`, `Expense`, `Category`, `PaymentMethod`.
- Importación y exportación de gastos en varios formatos.
- Dashboard con reportes y gráficos (Recharts).

---

## 🛠️ Stack tecnológico

<table>
<tr>
<td valign="top" width="33%">

**⚙️ Backend**
- .NET 10 / ASP.NET Core Web API
- Entity Framework Core 10
- ASP.NET Core Identity + JWT
- Newtonsoft.Json (enums como string)
- Scalar (docs interactiva OpenAPI)

</td>
<td valign="top" width="33%">

**🎨 Frontend**
- React 19 + TypeScript
- Vite
- React Router 8
- Axios
- Tailwind CSS 4 + shadcn/ui
- Recharts · Lucide Icons · Sonner

</td>
<td valign="top" width="33%">

**🗄️ Base de datos**
- SQL Server
- EF Core Migrations
- Repositorios + Unit of Work

</td>
</tr>
</table>

---

## 🧱 Arquitectura del backend

El backend está organizado en 4 proyectos siguiendo **arquitectura Onion**:

```
┌───────────────────────────────────────┐
│   Menudo.Presentation (Controllers)    │  ← API, middlewares, sin lógica de negocio
├───────────────────────────────────────┤
│   Menudo.Infrastructure (EF Core)      │  ← Persistencia, repositorios, JWT, migraciones
├───────────────────────────────────────┤
│   Menudo.Application (Servicios)       │  ← Lógica de negocio, DTOs, validadores, Strategy
├───────────────────────────────────────┤
│   Menudo.Domain (Entidades)            │  ← Entidades, enums, excepciones de dominio
└───────────────────────────────────────┘
```

**Principios aplicados:**
- Repositorios e interfaces para acceso a datos.
- DTOs de entrada y salida (las entidades nunca se exponen directamente).
- Inyección de dependencias en todas las capas (`AddApplication`, `AddInfrastructure`).
- Patrón **Strategy** para exportación de datos (`ExportStrategyFactory` + estrategias por formato).
- Excepciones de dominio tipadas (`NotFoundException`, `BadRequestException`, `ConflictException`, `ForbiddenException`, `UnauthorizedException`) manejadas globalmente en un middleware (`ExceptionMiddleware`).

---

## 📂 Estructura del proyecto

```
menudo/
├── backend/
│   ├── Menudo.Presentation/        # Controladores, Program.cs, middlewares
│   │   └── Controllers/            # Auth, Users, Categories, PaymentMethods,
│   │                                 Expenses, Dashboard, Import
│   ├── Menudo.Application/         # Servicios, DTOs, validadores, mapeos, Strategy
│   │   ├── Services/                # CategoryService, DashboardService, ExpenseService,
│   │   │                              ExportService, ImportService, PaymentMethodService
│   │   └── Strategy/                 # ExcelExportStrategy, JsonExportStrategy, TxtExportStrategy
│   ├── Menudo.Infrastructure/      # EF Core, repositorios, autenticación JWT, migraciones
│   └── Menudo.Domain/              # Entidades (User, Expense, Category, PaymentMethod),
│                                      enums y excepciones de dominio
├── frontend/
│   └── src/
│       ├── menudo/
│       │   ├── layouts/            # AppShell, SideBarBody, NavList
│       │   └── pages/              # auth, dashboard, expenses, categories,
│       │                             paymentMethods, reports, profile
│       ├── components/             # common, custom, ui (shadcn/ui)
│       ├── services/               # auth, category, expenses, export, import,
│       │                             paymentMethod, user (Axios)
│       ├── context/                 # AuthContext, MenudoContext
│       ├── hooks/, lib/, router/, data/
└── README.md
```

---

## 🧩 Módulos y funcionalidades

| Módulo | Descripción |
| --- | --- |
| **Autenticación** | Registro e inicio de sesión con JWT (`/api/auth`). |
| **Dashboard** | Resumen del gasto del usuario con gráficos (Recharts). |
| **Gastos** | CRUD de gastos con categoría, método de pago, monto, fecha y descripción. |
| **Categorías** | CRUD de categorías de gasto. |
| **Métodos de pago** | CRUD de métodos de pago (efectivo, tarjeta, transferencia, etc.). |
| **Reportes** | Vista de reportes y análisis del gasto. |
| **Importación** | Carga de gastos desde archivo (`ImportController` / `ImportService`). |
| **Exportación** | Exportación de datos en **Excel, TXT y JSON**, vía patrón Strategy. |
| **Perfil** | Datos del usuario autenticado. |

---

## 🚀 Instalación y ejecución

### Requisitos previos

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- SQL Server (local o remoto)

### Backend

```bash
cd backend
dotnet restore
```

Configura tu cadena de conexión en `Menudo.Presentation/appsettings.json` (sección `ConnectionStrings:DefaultConnection`), luego:

```bash
cd Menudo.Presentation
dotnet ef database update --project ../Menudo.Infrastructure
dotnet run
```

La API quedará disponible en `https://localhost:5001` (o el puerto configurado), con documentación interactiva de Scalar en `/scalar` durante desarrollo.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend quedará disponible en `http://localhost:5173` (puerto por defecto de Vite) y está configurado para consumir la API en `http://localhost:5173`/`http://localhost:3000` según CORS (`AllowFrontend`).

> ⚠️ **Nota:** este repositorio no incluye `docker-compose.yml`; la ejecución actual es manual (backend y frontend por separado).

---

## 🗺️ Roadmap

- [ ] Auditoría de entidades (`CreatedAt`, `UpdatedAt`)
- [ ] Soft delete en categorías, métodos de pago y gastos
- [ ] Paginación y ordenamiento avanzado en listados
- [ ] Refresh token para sesiones prolongadas
- [ ] Gastos recurrentes automáticos
- [ ] Adjuntar comprobante (imagen/PDF) a cada gasto
- [ ] Exportación a PDF
- [ ] Presupuestos por categoría con alertas de consumo
- [ ] Tests unitarios (xUnit + Moq)
- [ ] Logging estructurado (Serilog)
- [ ] Dockerización del proyecto (backend, frontend, base de datos)

---

## 📄 Licencia

Proyecto académico — ITLA, Programación II.

<div align="center">

---

Hecho con 🧾 y ☕ para el curso de Programación · ITLA

</div>
