import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard. The layout is successfully rendering child routes.</p>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h1>Users</h1>
      <p>Users list will be displayed here.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
