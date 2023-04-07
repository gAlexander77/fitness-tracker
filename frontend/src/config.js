export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
export const apiPath = (path) => `${apiUrl}/api${path.startsWith('/') ? path : '/'+path}`;