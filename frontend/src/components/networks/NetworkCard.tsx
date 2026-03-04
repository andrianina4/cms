import type { Network } from '../../types';
import { Pencil, Trash2, Globe } from 'lucide-react';
import { Button } from '../ui/button';

interface NetworkCardProps {
    network: Network;
    onEdit: (network: Network) => void;
    onDelete: (id: string) => void;
}

export function NetworkCard({ network, onEdit, onDelete }: NetworkCardProps) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-500">
                    <Globe className="h-6 w-6" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800">{network.name}</h4>
                    {network.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-[200px]">
                            {network.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-orange-100 bg-orange-50/30 text-orange-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                    onClick={() => onEdit(network)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-rose-100 bg-rose-50/30 text-rose-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                    onClick={() => onDelete(network.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
