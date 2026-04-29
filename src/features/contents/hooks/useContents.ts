import { buildApiUrl, fetcher } from '@/lib/api';
import useSWR from 'swr';
import type { Content } from './Content';

export const apiKey = buildApiUrl('content');

export const useContents = () => {
  const { data, mutate } = useSWR(apiKey, fetcher<Content[]>, {
    suspense: true,
  });

  const add = async () => {
    const result = await fetch(apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: null, body: null }),
    });
    await mutate();
    return result.json() as Promise<Content>;
  };

  const remove = async (id: number) => {
    await fetch(`${apiKey}/${id}`, {
      method: 'DELETE',
    });
    await mutate();
  };

  return { contents: data, add, remove };
};
