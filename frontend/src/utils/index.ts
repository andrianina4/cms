// ─── Utility Functions ────────────────────────────────────────────────────────

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Truncate a string to a given length.
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Build a query string from an object of parameters.
 */
export function buildQueryString(params: Record<string, string | number | boolean>): string {
    return new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
}
