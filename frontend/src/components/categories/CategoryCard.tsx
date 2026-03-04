import type { Category } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800">{category.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                        {category.slug}
                    </p>
                    {category.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-[200px]">
                            {category.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-orange-100 bg-orange-50/30 text-orange-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                    onClick={() => onEdit(category)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-rose-100 bg-rose-50/30 text-rose-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                    onClick={() => onDelete(category.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
