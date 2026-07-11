'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';

interface AdminControlsProps {
    showWhenEmpty?: boolean;
    minimal?: boolean;
}

export default function AdminControls({ showWhenEmpty = false, minimal = false }: AdminControlsProps) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const authCheck = window.setTimeout(() => {
            setIsAdmin(localStorage.getItem('blog_admin_auth') === 'awnon_authenticated');
        }, 0);

        return () => window.clearTimeout(authCheck);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Check password against environment variable
        const adminPassword = process.env.NEXT_PUBLIC_BLOG_ADMIN_PASSWORD;

        if (!adminPassword) {
            alert('Admin authentication is not configured. Please set NEXT_PUBLIC_BLOG_ADMIN_PASSWORD in your environment variables.');
            return;
        }

        if (password === adminPassword) {
            localStorage.setItem('blog_admin_auth', 'awnon_authenticated');
            setIsAdmin(true);
            setShowLogin(false);
            setPassword('');
        } else {
            alert('Invalid password');
            setPassword('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('blog_admin_auth');
        setIsAdmin(false);
    };

    if (isAdmin === null) return null;

    if (!isAdmin) {
        return (
            <div className="w-full sm:w-auto">
                {!showLogin ? (
                    <button
                        onClick={() => setShowLogin(true)}
                        className={`text-xs transition-colors ${minimal
                            ? 'inline-flex items-center gap-2 border border-accent/60 bg-accent/10 text-accent hover:bg-accent hover:text-white px-3 py-2 rounded-full shadow-sm'
                            : 'text-gray-500 hover:text-gray-400'
                            }`}
                        aria-label="Open admin login"
                        title="Admin Login"
                    >
                        {minimal ? <><FaLock size={12} /> Admin Login</> : 'Admin'}
                    </button>
                ) : (
                    <div className="w-full sm:min-w-72 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
                        <form onSubmit={handleLogin} className="space-y-3">
                            <div>
                                <label htmlFor="admin-password" className="block text-sm font-medium mb-1">
                                    Admin Password
                                </label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder="Enter admin password"
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="min-h-11 bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLogin(false)}
                                    className="min-h-11 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={minimal ? "flex flex-wrap items-center gap-3" : "space-y-4"}>
            {/* Admin Write Buttons */}
            {showWhenEmpty ? (
                <div className={minimal ? "" : "text-center"}>
                    <Link
                        href="/blog/editor"
                        className={`inline-block transition-colors font-semibold ${minimal
                            ? 'bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg text-sm'
                            : 'bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg'
                            }`}
                    >
                        ✏️ {minimal ? 'Write First Post' : 'Write Your First Post'}
                    </Link>
                </div>
            ) : (
                <div className={minimal ? "" : "text-center"}>
                    <Link
                        href="/blog/editor"
                        className={`inline-block transition-colors font-semibold ${minimal
                            ? 'bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg text-sm'
                            : 'bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg'
                            }`}
                    >
                        ✏️ {minimal ? 'Write Post' : 'Write New Post'}
                    </Link>
                </div>
            )}

            {/* Admin Controls */}
            {!minimal && (
                <div className="text-center">
                    <button
                        onClick={handleLogout}
                        className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                    >
                        Logout Admin
                    </button>
                </div>
            )}

            {minimal && (
                <button
                    onClick={handleLogout}
                    className="text-xs text-gray-500 hover:text-gray-400 transition-colors px-2 py-1 rounded"
                >
                    Logout
                </button>
            )}
        </div>
    );
}
