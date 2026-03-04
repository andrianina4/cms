import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import {
    Edit3,
    Trash2,
    Archive,
    Star,
    Eye,
    CheckCircle2
} from 'lucide-react';
import { articlesService } from '../services/articles.service';
import { DataTable } from '../components/common/DataTable';
import { ArticleFilters } from '../components/articles/ArticleFilters';
import { ArticleStatusBadge } from '../components/articles/ArticleStatusBadge';
import type { Article } from '../types';
import { formatDate } from '../utils';
import * as React from 'react';

export function ArticlesPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedArticles, setSelectedArticles] = React.useState<Article[]>([]);

    // States for filters
    const [search, setSearch] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [featured, setFeatured] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const limit = 20;

    // Fetch articles
    const { data, isLoading } = useQuery({
        queryKey: ['articles', { page, search, status, featured }],
        queryFn: () => articlesService.getAll({
            page: page + 1,
            limit,
            search,
            status,
            featured
        }),
    });

    // Bulk actions mutation
    const bulkUpdateMutation = useMutation({
        mutationFn: ({ ids, status }: { ids: string[], status: string }) =>
            articlesService.bulkUpdateStatus(ids, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            setSelectedArticles([]);
        }
    });

    const columns: ColumnDef<Article>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={row.getIsSelected()}
                    onChange={(e) => row.toggleSelected(!!e.target.checked)}
                />
            ),
        },
        {
            accessorKey: 'title',
            header: 'Titre',
            cell: ({ row }) => (
                <div className="flex flex-col max-w-[300px]">
                    <div className="flex items-center gap-2">
                        {row.original.featured && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        <span className="font-bold text-slate-800 line-clamp-1">{row.getValue('title')}</span>
                    </div>
                    <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">{row.original.excerpt}</span>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Statut',
            cell: ({ row }) => <ArticleStatusBadge status={row.getValue('status')} />,
        },
        {
            accessorKey: 'categories',
            header: 'Catégories',
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.categories.slice(0, 2).map((cat) => (
                        <span
                            key={cat.id}
                            className="px-2 py-0.5 rounded text-[10px] font-bold border"
                            style={{
                                backgroundColor: `${cat.color}10`, // 10% opacity
                                color: cat.color,
                                borderColor: `${cat.color}30`
                            }}
                        >
                            {cat.name}
                        </span>
                    ))}
                    {row.original.categories.length > 2 && (
                        <span className="text-[10px] font-bold text-slate-400">+{row.original.categories.length - 2}</span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'network',
            header: 'Réseau',
            cell: ({ row }) => <span className="text-slate-500">{row.original.network.name}</span>,
        },
        {
            accessorKey: 'createdAt',
            header: 'Date',
            cell: ({ row }) => <span className="text-slate-400 text-xs">{formatDate(row.getValue('createdAt'))}</span>,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => navigate(`/articles/${row.original.id}/edit`)}
                        className="p-1.5 hover:bg-white border border-transparent hover:border-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-white border border-transparent hover:border-slate-100 rounded-lg text-slate-400 hover:text-amber-600 transition-all">
                        <Star className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-white border border-transparent hover:border-slate-100 rounded-lg text-slate-400 hover:text-indigo-400 transition-all">
                        <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-white border border-transparent hover:border-slate-100 rounded-lg text-slate-400 hover:text-blue-500 transition-all">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-white border border-transparent hover:border-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Filters Area */}
            <ArticleFilters
                onSearch={setSearch}
                onStatusChange={setStatus}
                onFeaturedToggle={setFeatured}
            />

            {/* Bulk Actions Bar */}
            {selectedArticles.length > 0 && (
                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-3xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-indigo-700 px-3 py-1 bg-indigo-100 rounded-full">
                            {selectedArticles.length} article(s) sélectionné(s)
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => bulkUpdateMutation.mutate({ ids: selectedArticles.map(a => a.id), status: 'published' })}
                            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Publier
                        </button>
                        <button
                            onClick={() => bulkUpdateMutation.mutate({ ids: selectedArticles.map(a => a.id), status: 'archived' })}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                        >
                            Archiver
                        </button>
                        <button className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl text-xs font-bold transition-all">
                            Supprimer
                        </button>
                    </div>
                </div>
            )}

            {/* Main Table */}
            <DataTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                pageCount={data ? Math.ceil(data.total / limit) : 0}
                onPaginationChange={(pageIndex) => setPage(pageIndex)}
                onSelectionChange={setSelectedArticles}
            />
        </div>
    );
}
