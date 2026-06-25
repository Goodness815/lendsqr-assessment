import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { LogIn } from './pages/login/LogIn';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ComingSoon } from './components/ui/coming-soon/ComingSoon';
import { AuthProvider } from './context/AuthContext';
import Users from './pages/users/Users';
import { UserDetails } from './pages/user-details/UserDetails';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LogIn />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="*" element={<ComingSoon />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
