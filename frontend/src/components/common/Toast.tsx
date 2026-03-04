import { useToastStore } from '../../store';
import type { Toast } from '../../store';
import { cn } from '../../lib/utils';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
            {toasts.map((toast: Toast) => (
                <div
                    key={toast.id}
                    className={cn(
                        "p-4 rounded-2xl border shadow-lg flex items-start gap-3 animate-in slide-in-from-right duration-300",
                        toast.type === 'success' && "bg-emerald-50 border-emerald-100 text-emerald-800",
                        toast.type === 'error' && "bg-red-50 border-red-100 text-red-800",
                        toast.type === 'info' && "bg-indigo-50 border-indigo-100 text-indigo-800"
                    )}
                >
                    <div className="shrink-0 mt-0.5">
                        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                        {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-500" />}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold leading-tight">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
