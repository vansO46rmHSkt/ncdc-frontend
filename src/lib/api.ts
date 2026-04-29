export const buildApiUrl = (url: string) => {
  return `${import.meta.env.VITE_BASE_URL}/${url}`;
};

export const fetcher = <T>(...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json() as T);
