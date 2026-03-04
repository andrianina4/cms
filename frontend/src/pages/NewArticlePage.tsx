import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
    Send,
    ChevronDown,
    Eye,
    Layout,
    Star
} from 'lucide-react';
import { articleSchema } from '../utils/validation';
import { categoriesService } from '../services/categories.service';
import { networksService } from '../services/networks.service';
import { articlesService } from '../services/articles.service';
import { CategoryPicker } from '../components/articles/CategoryPicker';
import { cn } from '../lib/utils';
import * as React from 'react';
import { useToastStore } from '../store';

export function NewArticlePage() {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const [isAutoSaving, setIsAutoSaving] = React.useState(false);
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);

    // Fetch setup data
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: categoriesService.getAll,
    });

    const { data: networks = [] } = useQuery({
        queryKey: ['networks'],
        queryFn: networksService.getAll,
    });

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors, isValid, isDirty }
    } = useForm({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: '',
            excerpt: '',
            content: '',
            status: 'draft',
            networkId: '',
            categoryIds: [],
            featured: false,
        }
    });

    const formData = watch();

    const createMutation = useMutation({
        mutationFn: articlesService.create,
        onSuccess: (_newArticle, variables) => {
            // Only show main success toast if not an auto-save (handled in useEffect)
            if (variables.status !== 'draft') {
                addToast('Article créé avec succès', 'success');
            }
            navigate('/articles');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || 'Erreur lors de la création';
            addToast(message, 'error');
        }
    });

    const onSubmit = (data: any) => {
        createMutation.mutate(data);
    };

    const handleSaveAs = (status: 'draft' | 'published' | 'archived') => {
        setValue('status', status);
        handleSubmit(onSubmit)();
    };

    // Auto-save logic
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (isDirty && isValid && !createMutation.isPending && !isAutoSaving) {
                console.log('Auto-saving draft...');
                setIsAutoSaving(true);

                const currentData = watch();
                // Ensure status is draft for auto-save
                const dataToSave = { ...currentData, status: 'draft' as const };

                createMutation.mutate(dataToSave, {
                    onSuccess: (newArticle) => {
                        setIsAutoSaving(false);
                        setLastSaved(new Date());
                        // Redirect to edit page after first successful auto-save
                        // This prevents creating multiple articles if user stays on this page
                        navigate(`/articles/edit/${newArticle.id}`, { replace: true });
                        addToast('Brouillon auto-enregistré', 'success');
                    },
                    onError: () => {
                        setIsAutoSaving(false);
                    }
                });
            }
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [isDirty, isValid, createMutation, isAutoSaving, watch, navigate]);

    return (
        <div className="max-w-[1600px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Top Header Actions */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-serif">Nouvel article</h1>
                        <p className="text-slate-400 font-medium mt-1">Créez et prévisualisez en temps réel</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                            isAutoSaving ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                        )}>
                            <div className={cn("w-2 h-2 rounded-full animate-pulse", isAutoSaving ? "bg-indigo-500" : "bg-emerald-500")} />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                                {isAutoSaving ? 'Sauvegarde...' : lastSaved ? `Enregistré à ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Sauvegardé'}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSaveAs('draft')}
                            disabled={createMutation.isPending}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-white hover:border-slate-300 transition-all shadow-sm flex items-center gap-2"
                        >
                            Sauvegarder brouillon
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSaveAs('published')}
                            disabled={!isValid || createMutation.isPending}
                            className="bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed text-amber-900 px-8 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm shadow-amber-50"
                        >
                            <Send className="w-4 h-4" />
                            Publier
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Column: Form */}
                    <div className="space-y-8 bg-white/40 backdrop-blur-sm p-4 rounded-3xl -m-4">
                        <div className="space-y-6">
                            {/* Titre */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Titre *</label>
                                <input
                                    {...register('title')}
                                    placeholder="Titre de l'article (min. 5 caractères)"
                                    className={cn(
                                        "w-full bg-white border rounded-2xl py-4 px-5 text-sm font-medium focus:outline-none transition-all shadow-sm",
                                        errors.title ? "border-red-200 focus:ring-red-500/10 focus:border-red-500" : "border-slate-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                                    )}
                                />
                                {errors.title && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.title.message as string}</p>}
                            </div>

                            {/* Résumé */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Résumé</label>
                                <input
                                    {...register('excerpt')}
                                    placeholder="Court résumé de l'article"
                                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Auteur */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Auteur *</label>
                                    <input
                                        {...register('author')}
                                        placeholder="Nom de l'auteur"
                                        className={cn(
                                            "w-full bg-white border rounded-2xl py-4 px-5 text-sm font-medium focus:outline-none transition-all shadow-sm",
                                            errors.author ? "border-red-200 focus:ring-red-500/10 focus:border-red-500" : "border-slate-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                                        )}
                                    />
                                    {errors.author && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.author.message as string}</p>}
                                </div>

                                {/* Réseau */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Réseau *</label>
                                    <div className="relative">
                                        <select
                                            {...register('networkId')}
                                            className={cn(
                                                "w-full appearance-none bg-white border rounded-2xl py-4 pl-5 pr-12 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 transition-all shadow-sm cursor-pointer",
                                                errors.networkId ? "border-red-200 focus:ring-red-500/10" : "border-slate-100 focus:ring-indigo-500/10"
                                            )}
                                        >
                                            <option value="">Sélectionner un réseau</option>
                                            {networks.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Catégories * (au moins une)</label>
                                <Controller
                                    name="categoryIds"
                                    control={control}
                                    render={({ field }) => (
                                        <CategoryPicker
                                            categories={categories}
                                            selectedIds={field.value}
                                            onChange={field.onChange}
                                            error={errors.categoryIds?.message as string}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6 items-center pt-2">
                                {/* Statut */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Statut</label>
                                    <div className="relative">
                                        <select
                                            {...register('status')}
                                            className="w-full appearance-none bg-white border border-slate-100 rounded-2xl py-4 pl-5 pr-12 text-sm font-bold text-slate-700 focus:outline-none transition-all shadow-sm cursor-pointer"
                                        >
                                            <option value="draft">Brouillon</option>
                                            <option value="published">Publié</option>
                                            <option value="archived">Archivé</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>

                                {/* featured */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Article mis en avant</label>
                                    <label className="flex items-center gap-3 cursor-pointer mt-2 group">
                                        <Controller
                                            name="featured"
                                            control={control}
                                            render={({ field }) => (
                                                <div
                                                    onClick={() => field.onChange(!field.value)}
                                                    className={cn(
                                                        "w-12 h-6 rounded-full relative transition-colors duration-300",
                                                        field.value ? "bg-indigo-500" : "bg-slate-200"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                                                        field.value ? "left-7" : "left-1"
                                                    )} />
                                                </div>
                                            )}
                                        />
                                        <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-wider">
                                            {formData.featured ? 'Oui' : 'Non'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Contenu */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Contenu * ({formData.content.length} car.)</label>
                                </div>
                                <textarea
                                    {...register('content')}
                                    rows={10}
                                    placeholder="Rédigez le contenu de l'article (min. 50 caractères)..."
                                    className={cn(
                                        "w-full bg-white border rounded-3xl py-5 px-6 text-sm font-medium focus:outline-none transition-all shadow-sm resize-none",
                                        errors.content ? "border-red-200 focus:ring-red-500/10 focus:border-red-500" : "border-slate-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                                    )}
                                />
                                {errors.content && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.content.message as string}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="space-y-4 sticky top-28 h-fit">
                        <div className="flex items-center gap-2 mb-4">
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prévisualisation en temps réel</span>
                        </div>

                        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 min-h-full">
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    {formData.featured && (
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 uppercase tracking-wider">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            Mise en avant
                                        </span>
                                    )}
                                    {formData.categoryIds.map(id => {
                                        const cat = categories.find(c => c.id === id);
                                        if (!cat) return null;
                                        return (
                                            <span
                                                key={id}
                                                className="px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider"
                                                style={{ backgroundColor: `${cat.color}10`, color: cat.color, borderColor: `${cat.color}30` }}
                                            >
                                                {cat.name}
                                            </span>
                                        );
                                    })}
                                </div>

                                <h2 className={cn(
                                    "text-4xl font-bold font-serif leading-tight",
                                    formData.title ? "text-slate-900" : "text-slate-200"
                                )}>
                                    {formData.title || 'Titre de l\'article...'}
                                </h2>

                                <div className="flex items-center gap-4 py-6 border-y border-slate-50">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <Layout className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">{formData.author || 'Auteur'}</div>
                                        <div className="text-[11px] text-slate-400 font-medium">
                                            Article {formData.status === 'draft' ? 'en brouillon' : formData.status === 'published' ? 'publié' : 'archivé'}
                                        </div>
                                    </div>
                                </div>

                                <div className={cn(
                                    "prose prose-slate max-w-none line-height-relaxed",
                                    formData.content ? "text-slate-600" : "text-slate-200"
                                )}>
                                    {formData.content ? (
                                        <div className="whitespace-pre-wrap">{formData.content}</div>
                                    ) : (
                                        'Le contenu apparaîtra ici...'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
