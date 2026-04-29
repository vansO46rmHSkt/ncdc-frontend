import { buildApiUrl, fetcher } from '@/lib/api';
import useSWR from 'swr';
import type { Content } from './Content';
import { useCallback } from 'react';

export const apiKey = buildApiUrl('content');

export const useContents = () => {
  const { data, mutate } = useSWR(apiKey, fetcher<Content[]>, {
    suspense: true,
  });

  const add = useCallback(async () => {
    const result = await fetch(apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: null, body: null }),
    });
    await mutate();
    return result.json() as Promise<Content>;
  }, [mutate]);

  const remove = useCallback(
    async (id: number) => {
      await fetch(`${apiKey}/${id}`, {
        method: 'DELETE',
      });
      await mutate();
    },
    [mutate],
  );

  return { contents: data, add, remove };
};
