'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AdminControlsProps {
    showWhenEmpty?: boolean;
    minimal?: boolean;
}

export default function AdminControls({ showWhenEmpty = false, minimal = false }: AdminControlsProps) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if admin is already authenticated
        const adminAuth = localStorage.getItem('blog_admin_auth');
        if (adminAuth === 'awnon_authenticated') {
            setIsAdmin(true);
        }
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

    if (!isAdmin) {
        return (
            <div>
                {!showLogin ? (
                    <button
                        onClick={() => setShowLogin(true)}
                        className={`text-xs transition-colors ${minimal
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg'
                                : 'text-gray-500 hover:text-gray-400'
                            }`}
                    >
                        {minimal ? '🔑 Admin Login' : 'Admin'}
                    </button>
                ) : (
                    <div className="bg-gray-800 p-4 rounded-lg mt-4">
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
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter admin password"
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLogin(false)}
                                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors"
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
        <div className={minimal ? "flex items-center gap-3" : "space-y-4"}>
            {/* Admin Write Buttons */}
            {showWhenEmpty ? (
                <div className={minimal ? "" : "text-center"}>
                    <Link
                        href="/blog/editor"
                        className={`inline-block transition-colors font-semibold ${minimal
                                ? 'bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm'
                                : 'bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg'
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
                                ? 'bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm'
                                : 'bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg'
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
