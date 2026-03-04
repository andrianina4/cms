import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    PlusSquare,
    FolderTree,
    Bell,
    Upload,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../store';

const menuGroups = [
    {
        label: 'PRINCIPAL',
        items: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
            { name: 'Articles', icon: FileText, path: '/articles', count: 12 },
            { name: 'Nouvel article', icon: PlusSquare, path: '/articles/new' },
        ],
    },
    {
        label: 'GESTION',
        items: [
            { name: 'Catégories', icon: FolderTree, path: '/categories' },
            { name: 'Notifications', icon: Bell, path: '/notifications', count: 3 },
            { name: 'Import JSON', icon: Upload, path: '/import' },
        ],
    },
];

export function Sidebar() {
    const location = useLocation();
    const { isSidebarOpen, toggleSidebar } = useUIStore();

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden",
                    isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => toggleSidebar(false)}
            />

            <aside className={cn(
                "h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-[60] transition-all duration-300 ease-in-out",
                isSidebarOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden",
                "lg:translate-x-0",
                !isSidebarOpen && "translate-x-[-100%] lg:translate-x-0"
            )}>
                {/* Toggle Button Desktop */}
                <button
                    onClick={() => toggleSidebar()}
                    className="absolute -right-3 top-9 bg-white border border-slate-100 rounded-full p-1 shadow-sm text-slate-400 hover:text-indigo-600 transition-colors z-[70] hidden lg:flex"
                >
                    {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {/* Logo */}
                <div className={cn(
                    "p-6 flex items-center gap-3 transition-all duration-300",
                    !isSidebarOpen && "lg:px-4"
                )}>
                    <div className="w-10 h-10 min-w-[40px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100 italic">
                        T
                    </div>
                    <div className={cn(
                        "transition-all duration-300",
                        !isSidebarOpen && "lg:opacity-0 lg:hidden"
                    )}>
                        <h1 className="font-bold text-slate-800 tracking-tight leading-tight whitespace-nowrap">TARAM CMS</h1>
                        <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Back-office v1.0</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide">
                    {menuGroups.map((group) => (
                        <div key={group.label} className="space-y-2">
                            <h2 className={cn(
                                "px-4 text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase transition-all duration-300",
                                !isSidebarOpen && "lg:opacity-0 lg:h-0 lg:py-0 overflow-hidden"
                            )}>
                                {group.label}
                            </h2>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={() => window.innerWidth < 1024 && toggleSidebar(false)}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group relative",
                                                isActive
                                                    ? "bg-slate-50 text-indigo-600"
                                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                                                !isSidebarOpen && "lg:justify-center lg:px-0"
                                            )}
                                            title={!isSidebarOpen ? item.name : undefined}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className={cn(
                                                    "w-5 h-5 min-w-[20px] transition-colors",
                                                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                                                )} />
                                                <span className={cn(
                                                    "font-medium text-sm transition-all duration-300 whitespace-nowrap",
                                                    !isSidebarOpen && "lg:hidden opacity-0"
                                                )}>{item.name}</span>
                                            </div>
                                            {item.count && isSidebarOpen && (
                                                <span className={cn(
                                                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap",
                                                    isActive ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    {item.count}
                                                </span>
                                            )}
                                            {item.count && !isSidebarOpen && (
                                                <div className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full border border-white lg:block hidden" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User / Footer */}
                <div className="p-4 border-t border-slate-50 mt-auto">
                    <div className={cn(
                        "bg-slate-50 p-3 rounded-2xl flex items-center justify-between transition-all duration-300",
                        !isSidebarOpen && "lg:p-2 lg:bg-transparent"
                    )}>
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-9 h-9 min-w-[36px] bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center font-bold text-sm">
                                A
                            </div>
                            <div className={cn(
                                "transition-all duration-300 overflow-hidden",
                                !isSidebarOpen && "lg:hidden opacity-0"
                            )}>
                                <p className="text-sm font-bold text-slate-800 leading-tight whitespace-nowrap">Admin TARAM</p>
                                <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Administrateur</p>
                            </div>
                        </div>
                        <button className={cn(
                            "text-slate-300 hover:text-red-500 transition-colors",
                            !isSidebarOpen && "lg:hidden"
                        )}>
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
