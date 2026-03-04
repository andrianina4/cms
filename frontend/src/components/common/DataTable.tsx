import * as React from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table';
import type {
    ColumnDef,
    SortingState,
} from '@tanstack/react-table';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount?: number;
    onPaginationChange?: (page: number) => void;
    onSelectionChange?: (selectedRows: TData[]) => void;
    isLoading?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageCount,
    onPaginationChange,
    onSelectionChange,
    isLoading,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection,
        },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: pageCount ?? -1,
    });

    // Call onSelectionChange when selection changes
    React.useEffect(() => {
        if (onSelectionChange) {
            const selected = table.getSelectedRowModel().flatRows.map((row) => row.original);
            onSelectionChange(selected);
        }
    }, [rowSelection, table, onSelectionChange]);

    return (
        <div className="w-full">
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b border-slate-50 bg-slate-50/50">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-6 py-4 font-bold text-slate-400 text-[11px] uppercase tracking-wider">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-slate-50 relative min-h-[100px]">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                        Chargement...
                                    </div>
                                </td>
                            </tr>
                        ) : table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className={cn(
                                    "hover:bg-slate-50/50 transition-colors",
                                    row.getIsSelected() && "bg-indigo-50/30"
                                )}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 text-slate-600 font-medium">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-400 italic">
                                    Aucun résultat trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 px-2">
                <div className="text-xs font-medium text-slate-400">
                    {table.getSelectedRowModel().flatRows.length} ligne(s) sélectionnée(s)
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            table.setPageIndex(0);
                            onPaginationChange?.(0);
                        }}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 rounded-xl border border-slate-100 text-slate-400 disabled:opacity-30 hover:bg-white transition-all shadow-sm"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => {
                            table.previousPage();
                            onPaginationChange?.(table.getState().pagination.pageIndex);
                        }}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 rounded-xl border border-slate-100 text-slate-400 disabled:opacity-30 hover:bg-white transition-all shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-slate-700 px-4">
                        Page {table.getState().pagination.pageIndex + 1}
                    </span>
                    <button
                        onClick={() => {
                            table.nextPage();
                            onPaginationChange?.(table.getState().pagination.pageIndex);
                        }}
                        disabled={!table.getCanNextPage()}
                        className="p-2 rounded-xl border border-slate-100 text-slate-400 disabled:opacity-30 hover:bg-white transition-all shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => {
                            const lastPage = table.getPageCount() - 1;
                            table.setPageIndex(lastPage);
                            onPaginationChange?.(lastPage);
                        }}
                        disabled={!table.getCanNextPage()}
                        className="p-2 rounded-xl border border-slate-100 text-slate-400 disabled:opacity-30 hover:bg-white transition-all shadow-sm"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
