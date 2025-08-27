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

// Normalize network/timeout errors so UI can react consistently
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // If there is no response (network error, CORS, DNS) or request timed out
        const isTimeout = error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout');
        if (!error.response || isTimeout) {
            const enhanced = new Error('Network error: unable to reach the server. Please try again.');
            // attach original for debugging
            // @ts-expect-error attach original
            enhanced.cause = error;
            // @ts-expect-error name override for easier detection
            enhanced.name = 'NetworkError';
            return Promise.reject(enhanced);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance