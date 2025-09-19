// Backend URL configuration for different environments
const isDevelopment = import.meta.env.DEV;
const PRODUCTION_BACKEND_URL = 'https://coursebase.onrender.com/api/v1';
const DEVELOPMENT_BACKEND_URL = 'http://localhost:4001/api/v1';

export const BACKEND_URL = isDevelopment ? DEVELOPMENT_BACKEND_URL : PRODUCTION_BACKEND_URL;

// Alternative: Use environment variable if available
// export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://coursebase.onrender.com/api/v1';

console.log('Current environment:', isDevelopment ? 'development' : 'production');
console.log('Backend URL:', BACKEND_URL);