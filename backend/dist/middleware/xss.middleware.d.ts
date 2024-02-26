import type { ExpressMiddleware, SanitizeOptions } from '../types/types';
export declare const xssMiddleware: (options?: SanitizeOptions) => ExpressMiddleware;
