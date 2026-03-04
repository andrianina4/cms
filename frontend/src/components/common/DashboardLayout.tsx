import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '../../store';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
    const { isSidebarOpen } = useUIStore();

    return (
        <div className="min-h-screen bg-slate-50/50 flex">
            <Sidebar />
            <div className={cn(
                "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
            )}>
                <Header />
                <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
                    <div className="max-w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
