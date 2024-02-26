import type { Sanitized, SanitizeOptions } from '../types/types';
export declare const sanitize: <T extends unknown>(data: T, options?: SanitizeOptions) => Sanitized<T>;
