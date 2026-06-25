# Product Requirements Document (PRD)
## Project Name: `lendsqr-fe-test` (MVP Baseline)

---

## 1. Technical Stack Constraints
No external UI component libraries (Tailwind, MUI, etc.) are allowed. The project must use only these foundational libraries:

* **Framework:** React + TypeScript (Vite template).
* **Styling:** Pure SCSS Modules (`*.module.scss`). Global styles are restricted to tokens (`_variables.scss`, `_mixins.scss`).
* **Routing:** `react-router-dom`
* **Icons:** `lucide-react` (or standard SVG paths matching the branding).

---

## 2. Codebase Architecture

src/
├── assets/styles/
│   ├── _variables.scss   # Color palettes and fonts extracted from images
│   ├── _mixins.scss      # Media queries for mobile/tablet responsive break points
│   └── global.scss       # Global reset styles
├── components/
│   ├── common/           # Reusable Table, Button, Input, StatusBadge
│   └── layout/           # Topbar and Sidebar components
├── context/              # LocalStorage state sync logic
├── hooks/                # useFetchUsers (mock data handler)
├── pages/
│   ├── Login/            # Login interface
│   ├── Dashboard/        # Summary metric grid
│   ├── Users/            # Data table view with pagination and filters
│   └── UserDetails/      # Tabs and expanded user profiles
├── types/
│   └── user.ts           # Dynamic user types (defined below)
└── App.tsx               # Application shell and route declarations

---

## 3. Strict Data Strategy

### 3.1 Data Schema Initialization
To prevent code misalignment, do not hardcode mock schemas. Your agent must read the user schema directly from your images.

// src/types/user.ts

/**
 * INSTRUCTION FOR THE AI AGENT:
 * Analyze the attached 'Users' table columns and 'User Details' screen. 
 * Map every visible field, label, group, and text item into this interface.
 * Do not invent fields outside what is visually present in the screenshots.
 */
export interface UserRecord {
  id: string;
  // AI Agent: Inspect screenshots and populate all visible string, numeric, or status fields here.
}

### 3.2 Mock API Setup
* Generate **500 records** based on the schema extracted from the images.
* Serve this JSON array from a mock provider endpoint (e.g., `mockapi.io`, `json-generator.com`, or `mocky.io`).

---

## 4. MVP Feature Implementation Map

### 4.1 Login
* **UI:** Split layout matching the image (branding/artwork on one side, credentials form on the other).
* **Behavior:** Basic input validation routing to the dashboard.

### 4.2 Application Shell (Topbar & Sidebar)
* **UI:** Persistent structural navigation components framing the view area.
* **Responsiveness:** Sidebar must smoothly collapse into an accessible menu overlay on mobile and tablet viewport widths.

### 4.3 Users Page
* **Table:** Render columns based on the main table screenshot. Status fields must dynamically apply corresponding style classes.
* **Pagination:** Control panel to swap pages, select page sizes (10, 20, 50, 100), and display structural navigation links.
* **Filters:** Clicking a column filter icon opens an inline modal containing form filters matching the UI image.
* **Action Context:** The 3-dot dropdown menu next to each user row must contain action links matching the design (e.g., view details, change status).

### 4.4 User Details Page
* **State Sync:** Clicking "View Details" reads the user record ID via URL routing parameters, caches/retrieves it from `LocalStorage` or `IndexedDB`, and loads it onto this view.
* **UI Structure:** Render the header information section, navigation tabs, and structured info grids matching the screens exactly.
* **Status Updates:** Clicking state toggle buttons (e.g., active/blacklist) updates the stored values locally.

---

## 5. Resiliency Layout States
The agent must implement fallback layouts for structural exceptions:
* **Loading State:** Match table layouts using gray wireframe block loading animation blocks (Skeletons).
* **Empty State:** Display an error or search reset notice when search filter combinations output 0 array rows.
* **Error State:** Catch failed fetch statuses gracefully, presenting a retry interface toggle action.

---

## 6. Verification Test Outline

// src/pages/Users/__tests__/UsersTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Users from '../index';

describe('Users Table Engineering Test Suite', () => {
  it('renders loading states prior to receiving API payload data', () => {
    render(<BrowserRouter><Users/></BrowserRouter>);
    // Agent: Assert skeleton components exist
  });

  it('updates display page range indices when pagination buttons are activated', async () => {
    render(<BrowserRouter><Users/></BrowserRouter>);
    // Agent: Assert page tracking interaction logic
  });
});