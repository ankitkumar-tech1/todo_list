import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a better spinner
    }

    if (isAuthenticated && user?.role === 'admin') {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default AdminRoute;
