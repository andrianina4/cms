import { Search, ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import * as React from 'react';

interface ArticleFiltersProps {
    onSearch: (value: string) => void;
    onStatusChange: (status: string) => void;
    onFeaturedToggle: (featured: boolean) => void;
}

export function ArticleFilters({ onSearch, onStatusChange, onFeaturedToggle }: ArticleFiltersProps) {
    const [searchValue, setSearchValue] = React.useState('');
    const [isFeatured, setIsFeatured] = React.useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onSearch(e.target.value);
    };

    const handleFeaturedToggle = () => {
        const newVal = !isFeatured;
        setIsFeatured(newVal);
        onFeaturedToggle(newVal);
    };

    return (
        <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Search Input */}
            <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Rechercher par titre ou contenu..."
                    className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
            </div>

            {/* Selects Mockups (Simplified for now) */}
            <div className="flex items-center gap-3">
                <div className="relative group">
                    <select
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="appearance-none bg-white border border-slate-100 rounded-2xl py-3 pl-5 pr-12 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm cursor-pointer"
                    >
                        <option value="">Tous statuts</option>
                        <option value="published">Publiés</option>
                        <option value="draft">Brouillons</option>
                        <option value="archived">Archivés</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative group">
                    <select className="appearance-none bg-white border border-slate-100 rounded-2xl py-3 pl-5 pr-12 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm cursor-pointer">
                        <option>Toutes catégories</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative group">
                    <select className="appearance-none bg-white border border-slate-100 rounded-2xl py-3 pl-5 pr-12 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm cursor-pointer">
                        <option>Tous réseaux</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Featured Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                        onClick={handleFeaturedToggle}
                        className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                            isFeatured
                                ? "bg-indigo-600 border-indigo-600"
                                : "bg-white border-slate-200 group-hover:border-indigo-300"
                        )}
                    >
                        {isFeatured && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                    </div>
                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Mis en avant</span>
                </label>
            </div>
        </div>
    );
}
