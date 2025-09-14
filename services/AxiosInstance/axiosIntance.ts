import axios from 'axios';

// Determine base URL depending on environment (server vs client)
const isServer = typeof window === 'undefined';
const serverBase = process.env.NEXT_INTERNAL_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
const clientBase = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
    baseURL: isServer ? serverBase : clientBase,
    // Add a sensible timeout to avoid hanging requests when server doesn't respond
    timeout: 15000,
});

export default axiosInstance