import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { LogIn } from './pages/login/LogIn';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ComingSoon } from './components/ui/coming-soon/ComingSoon';
import { AuthProvider } from './context/AuthContext';

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
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LogIn />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<ComingSoon />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
