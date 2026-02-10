import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: currentUser } = useAuth();

    // Modal state for password reset
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/users');
            setUsers(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter((user) => user._id !== id));
            } catch (err) {
                console.error(err);
                alert('Failed to delete user');
            }
        }
    };

    const openResetModal = (user) => {
        setSelectedUser(user);
        setNewPassword('');
        setResetMessage('');
        setIsResetModalOpen(true);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) {
            setResetMessage('Password must be at least 6 characters');
            return;
        }

        try {
            await api.put(`/admin/users/${selectedUser._id}/password`, {
                password: newPassword,
            });
            setResetMessage('Password updated successfully!');
            setTimeout(() => {
                setIsResetModalOpen(false);
                setResetMessage('');
            }, 1500);
        } catch (err) {
            console.error(err);
            setResetMessage('Failed to update password');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground p-6">
            <header className="mb-8 flex items-center justify-between max-w-6xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted mt-2">Manage users and permissions</p>
                </div>
                <Link to="/" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    Back to App
                </Link>
            </header>

            <main className="max-w-6xl mx-auto">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="p-4 font-semibold text-muted">Name</th>
                                    <th className="p-4 font-semibold text-muted">Email</th>
                                    <th className="p-4 font-semibold text-muted">Role</th>
                                    <th className="p-4 font-semibold text-muted">Joined</th>
                                    <th className="p-4 font-semibold text-muted">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium">{u.name}</td>
                                        <td className="p-4 text-muted">{u.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-muted">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 flex items-center gap-3">
                                            <button
                                                onClick={() => openResetModal(u)}
                                                className="text-sm px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                                            >
                                                Reset Password
                                            </button>
                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="text-sm px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={u._id === currentUser._id}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {users.length === 0 && (
                        <div className="p-8 text-center text-muted">No users found.</div>
                    )}
                </div>
            </main>

            {/* Reset Password Modal */}
            {isResetModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md bg-slate-900 border border-white/10 rounded-xl p-6 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Reset Password</h3>
                            <button
                                onClick={() => setIsResetModalOpen(false)}
                                className="text-muted hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="mb-4 text-sm text-muted">
                            Resetting password for <span className="text-white font-medium">{selectedUser?.email}</span>
                        </p>

                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted">New Password</label>
                                <input
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder="Enter new password"
                                />
                            </div>

                            {resetMessage && (
                                <div className={`p-3 rounded text-sm ${resetMessage.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {resetMessage}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsResetModalOpen(false)}
                                    className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium transition-colors"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
