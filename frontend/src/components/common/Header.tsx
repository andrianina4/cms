import { Plus, Menu, User as UserIcon, Shield } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useUIStore, useAuthStore } from '../../store';
import { cn } from '../../lib/utils';
import { useEffect } from 'react';

const getPageTitle = (pathname: string) => {
    switch (pathname) {
        case '/': return 'Tableau de bord';
        case '/articles': return 'Gestion des articles';
        case '/articles/new': return 'Création d\'article';
        case '/categories': return 'Catégories';
        case '/networks': return 'Réseaux';
        case '/notifications': return 'Notifications';
        case '/import': return 'Importation de données';
        default: return 'Page';
    }
};

const SIMULATED_USERS = [
    {
        id: 'admin-sim',
        name: 'Admin TARAM',
        email: 'admin@taram.com',
        role: 'admin',
    },
    {
        id: 'editor-sim',
        name: 'Editor TARAM',
        email: 'editor@taram.com',
        role: 'editor',
    }
];

export function Header() {
    const location = useLocation();
    const title = getPageTitle(location.pathname);
    const { toggleSidebar } = useUIStore();
    const { user, setUser } = useAuthStore();

    // Auto-login as Admin if no user is set (for simulation)
    useEffect(() => {
        if (!user) {
            setUser(SIMULATED_USERS[0], 'simulated-token');
        }
    }, [user, setUser]);

    const handleUserSwitch = (role: string) => {
        const selectedUser = SIMULATED_USERS.find(u => u.role === role);
        if (selectedUser && user?.role !== role) {
            setUser(selectedUser, 'simulated-token');
            // Force reload to completely reset API instances, query caches, and app state
            window.location.reload();
        }
    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => toggleSidebar()}
                    className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight line-clamp-1">{title}</h2>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                {/* Simulator Switcher */}
                <div className="hidden sm:flex items-center bg-slate-100/50 p-1 rounded-2xl border border-slate-100">
                    {SIMULATED_USERS.map((simUser) => (
                        <button
                            key={simUser.role}
                            onClick={() => handleUserSwitch(simUser.role)}
                            className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                                user?.role === simUser.role
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            {simUser.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                            <span className="uppercase tracking-wider">{simUser.role}</span>
                        </button>
                    ))}
                </div>

                <Link
                    to="/articles/new"
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-sm shadow-amber-50 whitespace-nowrap border border-amber-200/50"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden xs:inline">Nouvel article</span>
                    <span className="xs:hidden">Nouveau</span>
                </Link>

                {/* Current User Display (Mobile switcher simplified) */}
                <div className="flex items-center gap-2 pl-2 md:pl-0 border-l border-slate-100 md:border-none">
                    <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm",
                        user?.role === 'admin' ? "bg-indigo-100 text-indigo-700" : "bg-purple-100 text-purple-700"
                    )}>
                        {user?.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
