import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Mail,
    Clock,
    ChevronDown,
    PlusCircle,
    Loader2
} from 'lucide-react';
import { articlesService } from '../services/articles.service';
import { notificationsService } from '../services/notifications.service';
import type { Notification } from '../services/notifications.service';
import { notificationSchema } from '../utils/validation';
import type { NotificationFormData } from '../utils/validation';
import { cn } from '../lib/utils';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useAuthStore, useToastStore } from '../store';
import * as React from 'react';

export function NotificationsPage() {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const { addToast } = useToastStore();
    const isAdmin = user?.role === 'admin';

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<NotificationFormData>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            articleId: '',
            recipients: 'cmail1@ex.com, cmail2@ex.com',
            subject: '📢 Nouvel article : Guide complet de l\'outsourcing digital en 2026',
        }
    });

    const formData = watch();

    // Fetch articles for the dropdown
    const { data: articlesData } = useQuery({
        queryKey: ['articles', { limit: 100 }],
        queryFn: () => articlesService.getAll({ limit: 100 }),
    });

    // Fetch real notification history
    const { data: notificationsData, isLoading: isLoadingHistory } = useQuery({
        queryKey: ['notifications'],
        queryFn: notificationsService.getAll,
    });

    // Auto-fill subject when article changes
    React.useEffect(() => {
        if (formData.articleId) {
            const article = articlesData?.data.find((a: any) => a.id === formData.articleId);
            if (article) {
                reset({
                    ...formData,
                    subject: `📢 Nouvel article : ${article.title}`
                });
            }
        }
    }, [formData.articleId, articlesData, reset]);

    const articles = articlesData?.data || [];
    const notifications = (notificationsData?.data || []) as Notification[];

    const selectedArticle = articles.find(a => a.id === formData.articleId);

    const sendMutation = useMutation({
        mutationFn: notificationsService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            addToast('Notification envoyée avec succès', 'success');
            reset({
                articleId: '',
                recipients: '',
                subject: ''
            });
        },
        onError: (error: any) => {
            addToast(error.message || "Erreur lors de l'envoi", 'error');
        }
    });

    const onSubmit = (data: NotificationFormData) => {
        sendMutation.mutate(data);
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-serif">Notifications Email</h1>
                    <p className="text-slate-400 font-medium mt-1">Historique et envoi de notifications</p>
                </div>
                <Button className="bg-amber-100 hover:bg-amber-200 text-amber-900 border-none rounded-xl px-6 py-2.5 font-bold shadow-sm shadow-amber-50">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nouvel article
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form & Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-800">Envoyer une notification</h3>

                            <div className="space-y-4">
                                {/* Article Selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ARTICLE CONCERNÉ *</label>
                                    <div className="relative">
                                        <select
                                            {...register('articleId')}
                                            className={cn(
                                                "w-full appearance-none bg-slate-50 border rounded-2xl py-4 px-5 text-sm font-medium focus:outline-none transition-all cursor-pointer",
                                                errors.articleId ? "border-red-200 focus:ring-red-500/10 focus:border-red-500" : "border-slate-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                                            )}
                                        >
                                            <option value="">Sélectionner un article</option>
                                            {articles.map(article => (
                                                <option key={article.id} value={article.id}>{article.title}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                    {errors.articleId && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.articleId.message}</p>}
                                </div>

                                {/* Recipients */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">DESTINATAIRES (SÉPARÉS PAR VIRGULES) *</label>
                                    <input
                                        {...register('recipients')}
                                        type="text"
                                        placeholder="email1@example.com, email2@example.com"
                                        className={cn(
                                            "w-full bg-slate-50 border rounded-2xl py-4 px-5 text-sm font-medium focus:outline-none transition-all shadow-sm",
                                            errors.recipients ? "border-red-200 focus:ring-red-500/10 focus:border-red-500" : "border-slate-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                                        )}
                                    />
                                    {errors.recipients && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.recipients.message}</p>}
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">SUJET *</label>
                                    <input
                                        {...register('subject')}
                                        type="text"
                                        className={cn(
                                            "w-full bg-slate-50 border rounded-2xl py-4 px-5 text-sm font-medium focus:outline-none transition-all shadow-sm",
                                            errors.subject ? "border-red-200 focus:ring-red-500/10 focus:border-red-500" : "border-slate-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                                        )}
                                    />
                                    {errors.subject && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.subject.message}</p>}
                                </div>

                                {/* Email Preview */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">PRÉVISUALISATION EMAIL</label>
                                    <div className="border border-slate-100 rounded-[24px] overflow-hidden shadow-sm">
                                        <div className="bg-indigo-600 p-4 flex items-center justify-center gap-2 text-white">
                                            <Mail className="w-5 h-5 opacity-80" />
                                            <span className="font-bold text-lg">Nouvelle publication</span>
                                        </div>
                                        <div className="p-8 bg-white space-y-4">
                                            <h2 className="text-2xl font-bold text-slate-900 font-serif line-clamp-2">
                                                {selectedArticle?.title || "Sélectionnez un article pour voir l'aperçu"}
                                            </h2>
                                            <p className="text-slate-500 text-sm font-medium">
                                                {selectedArticle?.excerpt ? "Résumé de l'article" : "L'aperçu apparaîtra ici."}
                                            </p>

                                            <div className="border-l-4 border-indigo-500 pl-4 py-1">
                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                                    {selectedArticle?.excerpt || "L'extrait de l'article sélectionné s'affichera ici pour prévisualisation..."}
                                                </p>
                                            </div>

                                            <button type="button" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 mt-4 disabled:opacity-50">
                                                Lire l'article →
                                            </button>
                                        </div>
                                        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                                            <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                                                © 2026 TARAM Group — Vous recevez cet email car vous êtes abonné à notre newsletter.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={sendMutation.isPending || !isAdmin}
                                className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-8 py-6 font-bold text-sm shadow-xl shadow-amber-100 transition-all disabled:opacity-50 w-full sm:w-auto"
                            >
                                {sendMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    isAdmin ? 'Envoyer la notification' : 'Envoi réservé aux administrateurs'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Right Column: History */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-full flex flex-col min-h-[500px]">
                        <h3 className="text-xl font-bold text-slate-800 mb-8">Historique</h3>

                        <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {isLoadingHistory ? (
                                <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400">
                                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                                    <p className="text-sm font-medium">Chargement de l'historique...</p>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400 text-center">
                                    <Clock className="w-12 h-12 mb-4 opacity-20" />
                                    <p className="text-sm font-medium">Aucune notification envoyée</p>
                                </div>
                            ) : (
                                notifications.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm shrink-0",
                                            item.status === 'sent' ? "bg-emerald-50 text-emerald-500 group-hover:scale-110" : "bg-red-50 text-red-500 group-hover:scale-110"
                                        )}>
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-bold text-slate-800 text-sm truncate">{item.subject}</h4>
                                                <Badge variant="outline" className={cn(
                                                    "border-none text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0",
                                                    item.status === 'sent' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                                )}>
                                                    {item.status === 'sent' ? 'Envoyé' : 'Échoué'}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium leading-tight">
                                                Article: {item.article?.title || 'N/A'}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold truncate">
                                                À: {item.recipients}
                                            </p>
                                            <div className="flex items-center gap-1.5 pt-1 text-slate-300">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                                    {new Date(item.sentAt).toLocaleString([], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


