import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-500">AniMern</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-blue-400">{t('Home')}</Link>
                    <Link to="/anime" className="hover:text-blue-400">{t('Anime')}</Link>
                    <Link to="/manga" className="hover:text-blue-400">{t('Manga')}</Link>
                    {user && user.role === 'admin' && (
                        <Link to="/admin" className="hover:text-red-400">{t('Admin Dashboard')}</Link>
                    )}
                </div>
                <div>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span>Welcome, {user.username}</span>
                            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                        </div>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/login" className="px-3 py-1 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white">{t('Login')}</Link>
                            <Link to="/register" className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600">{t('Register')}</Link>
                            <Link to="/admin/login" className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-sm">{t('Admin Login')}</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
