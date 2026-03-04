import { Plus, Menu } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useUIStore } from '../../store';

const getPageTitle = (pathname: string) => {
    switch (pathname) {
        case '/': return 'Tableau de bord';
        case '/articles': return 'Gestion des articles';
        case '/articles/new': return 'Création d\'article';
        case '/categories': return 'Catégories';
        case '/notifications': return 'Notifications';
        case '/import': return 'Importation de données';
        default: return 'Page';
    }
};

export function Header() {
    const location = useLocation();
    const title = getPageTitle(location.pathname);
    const { toggleSidebar } = useUIStore();

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

            <div className="flex items-center gap-4">
                <Link
                    to="/articles/new"
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-sm shadow-amber-50 whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden xs:inline">Nouvel article</span>
                    <span className="xs:hidden">Nouveau</span>
                </Link>
            </div>
        </header>
    );
}
