export const buildApiUrl = (path: string) => {
  return `${import.meta.env.VITE_BASE_URL}/${path}`;
};

export const fetcher = <T>(...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json() as T);
