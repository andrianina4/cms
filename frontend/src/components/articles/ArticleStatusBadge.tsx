import { cn } from '../../lib/utils';
import type { ArticleStatus } from '../../types';

interface ArticleStatusBadgeProps {
    status: ArticleStatus;
    className?: string;
}

export function ArticleStatusBadge({ status, className }: ArticleStatusBadgeProps) {
    const styles = {
        draft: "bg-amber-50 text-amber-700 border-amber-100",
        published: "bg-emerald-50 text-emerald-700 border-emerald-100",
        archived: "bg-slate-50 text-slate-700 border-slate-100",
    };

    const labels = {
        draft: "Brouillon",
        published: "Publié",
        archived: "Archivé",
    };

    return (
        <span className={cn(
            "px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider",
            styles[status],
            className
        )}>
            {labels[status]}
        </span>
    );
}
