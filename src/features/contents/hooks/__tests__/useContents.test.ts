import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import useSWR from 'swr';
import { useContents, apiKey } from '../useContents';

vi.mock('swr');

const mockedUseSWR = useSWR as Mock;
const mockedFetch = vi.fn();
globalThis.fetch = mockedFetch;

describe('useContents', () => {
  const initContent = {
    id: 1,
    title: 'title-test',
    body: 'body-test',
    createdAt: 'createdAt-test',
    updatedAt: 'updatedAt-test',
  };

  const mockedMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseSWR.mockReturnValue({
      data: [initContent],
      mutate: mockedMutate,
    });
  });

  it('useSWRの実行結果が初期値として設定される', () => {
    const { result } = renderHook(() => useContents());

    expect(result.current.contents).toEqual([initContent]);
  });

  it('addでデータを追加する', async () => {
    const mockJson = vi.fn().mockResolvedValue({
      id: 2,
      title: null,
      body: null,
      createdAt: initContent.createdAt,
      updatedAt: initContent.updatedAt,
    });

    mockedFetch.mockResolvedValue({
      json: mockJson,
    });

    const { result } = renderHook(() => useContents());

    const data = await act(async () => {
      return await result.current.add();
    });

    expect(data).toEqual({
      id: 2,
      title: null,
      body: null,
      createdAt: initContent.createdAt,
      updatedAt: initContent.updatedAt,
    });

    expect(fetch).toHaveBeenCalledWith(apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: null, body: null }),
    });

    expect(mockedMutate).toHaveBeenCalled();
  });

  it('removeでデータを削除する', async () => {
    mockedFetch.mockResolvedValue({});

    const { result } = renderHook(() => useContents());

    await act(async () => {
      await result.current.remove(1);
    });

    expect(fetch).toHaveBeenCalledWith(`${apiKey}/1`, {
      method: 'DELETE',
    });

    expect(mockedMutate).toHaveBeenCalled();
  });
});
