import { X, Layout, Eye } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Article } from '../../types';

interface ArticlePreviewModalProps {
    article: Article | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ArticlePreviewModal({ article, isOpen, onClose }: ArticlePreviewModalProps) {
    if (!isOpen || !article) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Eye className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Aperçu de l'article</h3>
                            <p className="text-xs text-slate-400 font-medium">Visualisation du rendu final</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {article.categories.map((cat) => (
                                <span
                                    key={cat.id}
                                    className="px-4 py-1.5 rounded-full text-[10px] font-bold border uppercase tracking-wider"
                                    style={{
                                        backgroundColor: `${cat.color}10`,
                                        color: cat.color,
                                        borderColor: `${cat.color}30`
                                    }}
                                >
                                    {cat.name}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-slate-900">
                            {article.title}
                        </h1>

                        {/* Author & Info */}
                        <div className="flex items-center gap-4 py-8 border-y border-slate-50">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <Layout className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">{article.author}</div>
                                <div className="text-xs text-slate-400 font-medium">
                                    {article.network.name} • {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-500 font-medium italic leading-relaxed mb-8">
                                {article.excerpt}
                            </p>
                            <div className="text-slate-700 leading-loose text-lg whitespace-pre-wrap">
                                {article.content}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-300 transition-all shadow-sm"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}
