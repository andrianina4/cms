import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

/**
 * Middleware to require any authenticated user (checks for presence of x-user-role)
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const role = req.headers['x-user-role'];

    if (!role) {
        return sendError(res, "Authentication required (missing x-user-role header)", 401);
    }

    next();
};

/**
 * Middleware to require specific roles
 * @param allowedRoles Array of strings (e.g., ['admin', 'editor'])
 */
export const requireRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.headers['x-user-role'] as string;

        if (!role) {
            return sendError(res, "Authentication required", 401);
        }

        if (!allowedRoles.includes(role)) {
            return sendError(res, `Forbidden: Role '${role}' does not have permission to perform this action`, 403);
        }

        next();
    };
};
