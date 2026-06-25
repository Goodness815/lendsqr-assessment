# Lendsqr Frontend Assessment

A React-based web application built as part of the Lendsqr Frontend Engineering assessment. This project implements a fully responsive dashboard for managing users, featuring complex filtering, sorting, pagination, and a simulated asynchronous API architecture.

## 🚀 Features Implemented

### 1. Authentication (Login Page)
- Secure, responsive login page styled precisely to Figma specifications.
- Fully simulated authentication flow using Context API (`AuthContext`) and local storage, ensuring restricted access to the dashboard via a `<ProtectedRoute />` wrapper.

### 2. Users Dashboard
- **Robust Data Table:** Displays users from a simulated asynchronous JSON API consisting of 500 records. 
- **Pagination:** Client-side pagination handling with dynamic UI and window/table scroll resetting.
- **Advanced Filtering:** A custom, fully-functional dropdown filter menu that allows querying by Organization, Username, Email, Phone Number, Date, and Status.
- **Sorting:** Clickable column headers (e.g. Organization, Email) to trigger ascending/descending data sorts.
- **Debounced Search:** Global table search with a 1-second debounce (`useDebounce` hook) to ensure optimal rendering performance.
- **Action Menus:** Dynamic overflow menus on rows (View Details, Blacklist, Activate) implemented using React Portals to prevent z-index clipping.

### 3. User Details Page
- Detailed breakdown of user profiles mapped exactly to the design guidelines.
- Dynamic navigation tabs ("General Details", "Documents", "Bank Details", etc.)
- Helper utility formatting for Dates and Nigerian Naira (₦) currency strings.

## 🛠️ Tech Stack & Tools

- **Framework:** [React 19](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Language:** TypeScript (Strict Mode)
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** SCSS Modules (`.module.scss`) + Global mixins/variables for structural modularity.
- **Icons:** Custom SVG Assets & [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest](https://vitest.dev/) + React Testing Library (JSDOM)

## 📂 Code Structure

```text
src/
├── assets/         # Static assets (images, icons) and global SCSS files (_variables.scss, _mixins.scss)
├── components/     # Reusable UI components
│   ├── layouts/    # Global layouts (Topbar, Sidebar, Dashboard wrapper)
│   ├── ui/         # Isolated atomic UI elements (Table, Pagination, ActionMenu)
│   └── ScrollToTop.tsx # Route lifecycle helper
├── context/        # React Context providers (AuthContext)
├── hooks/          # Custom React hooks (useAuth, useDebounce, useUsers)
├── pages/          # Full page components (Login, Users, UserDetails)
├── types/          # TypeScript interface/type definitions
├── utils/          # Helpers (formatters) and mock data JSON 
├── App.tsx         # Root Router configuration
└── main.tsx        # React DOM entry point
```

## ⚙️ How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd lendsqr-assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open `http://localhost:5173` in your browser. Since the authentication is simulated for this assessment, you can input **any email and password** into the login form and click "Log in" to access the dashboard.

## 🧪 Running Tests

This project includes a comprehensive suite of unit tests built with Vitest and React Testing Library, testing core application flows such as routing, mocked API integrations, DOM interactions, and pagination.

To execute the test suite in watch mode:
```bash
npm run test
```

To run a single pass check:
```bash
npx vitest run
```
