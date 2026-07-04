import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL || "https://sk-enterprise.onrender.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

// Interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// TTL Cache Helper (15 minutes in milliseconds)
const CACHE_TTL = 15 * 60 * 1000;

const getCachedData = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > CACHE_TTL) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed.data;
    } catch (e) {
        console.warn("Cache read error:", e);
        return null;
    }
};

const setCachedData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify({
            timestamp: Date.now(),
            data
        }));
    } catch (e) {
        console.warn("Cache write error:", e);
    }
};

export const getProducts = async () => {
    const CACHE_KEY = "sk_products_cache_v2";
    const cached = getCachedData(CACHE_KEY);
    if (cached) return { data: cached, fromCache: true };

    const response = await api.get("/products");
    if (response.data && Array.isArray(response.data)) {
        setCachedData(CACHE_KEY, response.data);
    }
    return response;
};

export const getParts = async () => {
    const CACHE_KEY = "sk_parts_cache_v2";
    const cached = getCachedData(CACHE_KEY);
    if (cached) return { data: cached, fromCache: true };

    const response = await api.get("/parts");
    if (response.data && Array.isArray(response.data)) {
        setCachedData(CACHE_KEY, response.data);
    }
    return response;
};

export const submitContactForm = async (formData) => {
    return await api.post("/contact", formData);
};

export default api;
