export const config = {
  baseUrl: import.meta.env.VITE_APP_BACKEND_DEV as string,
  production: import.meta.env.VITE_APP_NODE_ENV_PROD as string,
  dev: import.meta.env.VITE_APP_NODE_ENV as string,
};
