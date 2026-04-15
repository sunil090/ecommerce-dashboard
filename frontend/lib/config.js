export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) throw new Error('Missing NEXT_PUBLIC_API_URL');
export const API_TIMEOUT = 10000;
export const API_VERSION = '/api/v1';
