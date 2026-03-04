import { useState, useEffect } from 'react';
import {
    FileText,
    CheckCircle2,
    Clock,
    Bell,
    TrendingUp,
    ChevronRight,
    CircleDot
} from 'lucide-react';
import { dashboardService } from '../services/dashboard.service';
import type { DashboardStats } from '../types';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getStats();
                setStats(data.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!stats) return null;

    // Find the max count for the bar chart
    const maxCategoryCount = Math.max(...stats.articlesByCategory.map(c => c.count), 1);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Tableau de bord</h3>
                <p className="text-slate-500 mt-1">Vue d'ensemble de votre plateforme éditoriale</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-slate-50 group-hover:scale-110 transition-transform duration-500">
                        <FileText className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Total Articles</p>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-bold text-slate-800">{stats.kpis.totalArticles}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-500 mt-2 text-sm font-medium">
                            <TrendingUp className="w-4 h-4" />
                            <span>À jour</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-emerald-50 group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle2 className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Publiés</p>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-bold text-slate-800">{stats.kpis.publishedArticles}</span>
                        </div>
                        <div className="text-slate-400 mt-2 text-sm font-medium">
                            <span>{stats.kpis.publishedPercentage}% du total</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-amber-50 group-hover:scale-110 transition-transform duration-500">
                        <Clock className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Brouillons</p>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-bold text-slate-800">{stats.kpis.draftArticles}</span>
                        </div>
                        <div className="text-amber-500 mt-2 text-sm font-medium">
                            <span>En attente</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-blue-50 group-hover:scale-110 transition-transform duration-500">
                        <Bell className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Notifications</p>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-bold text-slate-800">{stats.kpis.totalNotifications}</span>
                        </div>
                        <div className="text-slate-400 mt-2 text-sm font-medium">
                            <span>Envoyées</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="font-bold text-slate-800 tracking-tight">Répartition par catégorie</h4>
                        <select className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 focus:ring-0 text-slate-600 font-medium">
                            <option>Ce mois</option>
                            <option>Cette année</option>
                            <option>Global</option>
                        </select>
                    </div>

                    <div className="h-56 flex items-end gap-4 mt-8">
                        {stats.articlesByCategory.map((cat, index) => {
                            const heightPercent = maxCategoryCount > 0 ? (cat.count / maxCategoryCount) * 100 : 0;
                            const isHighest = cat.count > 0 && cat.count === maxCategoryCount;

                            return (
                                <div key={index} className="flex-1 h-full flex flex-col">
                                    <div className="w-full flex-1 relative">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end transition-all duration-700 ease-in-out"
                                            style={{ height: `${Math.max(heightPercent, 15)}%` }} // Minimum 15% to always show number and track
                                        >
                                            <span className="text-xs font-bold text-slate-600 mb-2">{cat.count}</span>
                                            <div
                                                className={cn(
                                                    "w-full flex-1 rounded-t-xl group relative",
                                                    isHighest ? "bg-gradient-to-t from-amber-300 to-amber-100" : "bg-gradient-to-t from-indigo-500 to-purple-400 opacity-80"
                                                )}
                                            >
                                                <div className="absolute inset-x-0 bottom-full mb-8 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center z-10 pointer-events-none">
                                                    <div className="bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
                                                        {cat.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 truncate w-full text-center mt-3 shrink-0 h-4">{cat.name}</span>
                                </div>
                            );
                        })}
                        {stats.articlesByCategory.length === 0 && (
                            <div className="w-full h-full flex justify-center items-center text-slate-400 text-sm">
                                Aucune donnée disponible
                            </div>
                        )}
                    </div>
                </div>

                {/* Networks List */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-800 tracking-tight mb-6">Réseaux utilisateurs</h4>
                    <div className="space-y-4">
                        {stats.articlesByNetwork.map((net, index) => {
                            const colors = ['text-purple-500', 'text-amber-500', 'text-emerald-500', 'text-blue-500'];
                            const colorClass = colors[index % colors.length];

                            return (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 group">
                                    <div className="flex items-center gap-3">
                                        <CircleDot className={cn("w-4 h-4", colorClass)} />
                                        <span className="font-medium text-slate-700">{net.name}</span>
                                    </div>
                                    <span className="font-bold text-lg text-slate-900">{net.count}</span>
                                </div>
                            );
                        })}
                        {stats.articlesByNetwork.length === 0 && (
                            <div className="text-slate-400 text-sm text-center py-4">
                                Aucune donnée disponible
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent Articles */}
                <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-slate-800 tracking-tight">Derniers articles publiés</h4>
                        <Link to="/articles" className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                            Voir tout <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="pb-3 px-4">Titre</th>
                                    <th className="pb-3 px-4">Statut</th>
                                    <th className="pb-3 px-4">Réseau</th>
                                    <th className="pb-3 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {stats.recentArticles.length > 0 ? stats.recentArticles.map((article) => (
                                    <tr key={article.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-slate-800 max-w-[200px] truncate" title={article.title}>{article.title}</td>
                                        <td className="py-4 px-4">
                                            <span className={cn(
                                                "px-2 py-1 rounded text-xs font-semibold",
                                                article.status === 'published' ? "bg-emerald-100 text-emerald-700" :
                                                    article.status === 'draft' ? "bg-amber-100 text-amber-700" :
                                                        "bg-slate-100 text-slate-700"
                                            )}>
                                                {article.status === 'published' ? 'Publié' : article.status === 'draft' ? 'Brouillon' : 'Archivé'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-slate-600">{article.network}</td>
                                        <td className="py-4 px-4 text-slate-500">{new Date(article.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-slate-500">Aucun article récent</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Notifications */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-slate-800 tracking-tight">Dernières notifications</h4>
                        <Link to="/notifications" className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                            Voir tout <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {stats.recentNotifications.length > 0 ? stats.recentNotifications.map((notif, index) => {
                            // Alternate colors for aesthetic similar to screenshot
                            const isFirst = index === 0;
                            const isError = notif.status === 'failed' || index === 2; // Simulated error

                            return (
                                <div key={notif.id} className="flex gap-4 items-start p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                        isError ? "bg-red-100 text-red-600" :
                                            isFirst ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"
                                    )}>
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-800 truncate" title={notif.subject}>{notif.subject}</p>
                                        <p className="text-xs text-slate-500 mt-1 truncate">{notif.articleTitle} • {notif.recipientsCount} dest.</p>
                                    </div>
                                    <div className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                                        {new Date(notif.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-slate-400 text-sm py-4 text-center">
                                Aucune notification récente
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
