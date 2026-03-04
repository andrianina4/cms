import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Category } from '../../types';

interface CategoryPickerProps {
    categories: Category[];
    selectedIds: string[];
    onChange: (ids: string[]) => void;
    error?: string;
}

export function CategoryPicker({ categories, selectedIds, onChange, error }: CategoryPickerProps) {
    const toggleCategory = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((i) => i !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const isSelected = selectedIds.includes(category.id);
                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => toggleCategory(category.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm",
                                isSelected
                                    ? "bg-white ring-2 ring-indigo-500/20 border-indigo-500 text-indigo-700"
                                    : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                            )}
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: category.color }}
                            />
                            {category.name}
                            {isSelected && <Check className="w-3 h-3 ml-1" />}
                        </button>
                    );
                })}
            </div>
            {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{error}</p>}
        </div>
    );
}
