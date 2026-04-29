import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock, test } from 'vitest';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { useContent } from '../useContent';
import { buildApiUrl } from '@/lib/api';

vi.mock('swr');
vi.mock('@/lib/api');

const mockedUseSWR = useSWR as Mock;
const mockedUseSWRConfig = useSWRConfig as Mock;
const mockedBuildApiUrl = buildApiUrl as Mock;

const mockedFetch = vi.fn();
globalThis.fetch = mockedFetch;

describe('useContent', () => {
  const initContent = {
    id: 1,
    title: 'title-test',
    body: 'body-test',
    createdAt: 'createdAt-test',
    updatedAt: 'updatedAt-test',
  };
  const mockedMutate = vi.fn();
  const mockedJson = vi.fn();

  const updateResult = Symbol();

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseSWR.mockReturnValue({
      data: initContent,
    });
    mockedUseSWRConfig.mockReturnValue({
      mutate: mockedMutate,
    });
    mockedBuildApiUrl.mockImplementation((s) => s);
    mockedJson.mockResolvedValue(updateResult);
    mockedFetch.mockResolvedValue({ json: mockedJson });
  });

  it('useSWRの実行結果が初期値として設定される', () => {
    const { result } = renderHook(() => useContent(1));

    expect(result.current.content).toEqual(initContent);
    expect(result.current.inputValues).toEqual({
      title: initContent.title,
      body: initContent.body,
    });
  });

  describe('タイトルに対する入力と更新', () => {
    it('changeで入力値を更新する', () => {
      const { result } = renderHook(() => useContent(1));

      act(() => {
        result.current.change('title', 'new title');
      });

      expect(result.current.inputValues).toEqual({
        title: 'new title',
        body: initContent.body,
      });
    });

    describe('updateの検証', () => {
      test.each([1, 30, 50])(
        'タイトルが%d文字の場合は更新に成功する',
        async (len) => {
          const { result } = renderHook(() => useContent(1));

          const value = 'a'.repeat(len);

          act(() => {
            result.current.change('title', value);
          });

          const success = await act(async () => {
            return await result.current.update('title');
          });

          expect(success).toBe(true);
          expect(result.current.errors).toEqual({
            title: undefined,
            body: undefined,
          });

          expect(mockedFetch).toHaveBeenCalledWith(expect.any(String), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: value }),
          });

          expect(mockedMutate).toHaveBeenCalledWith(
            expect.any(String),
            Promise.resolve(updateResult),
          );
        },
      );

      it('タイトルが空の場合は更新に失敗しエラーが設定される', async () => {
        const { result } = renderHook(() => useContent(1));

        act(() => {
          result.current.change('title', '');
        });

        const success = await act(async () => {
          return await result.current.update('title');
        });

        expect(success).toBe(false);
        expect(result.current.errors).toEqual({
          title: 'タイトルは1文字以上で入力してください',
          body: undefined,
        });
      });

      it('タイトルが50文字を超える場合は更新に失敗しエラーがセットされる', async () => {
        const { result } = renderHook(() => useContent(1));

        act(() => {
          result.current.change('title', 'a'.repeat(51));
        });

        const success = await act(async () => {
          return await result.current.update('title');
        });

        expect(success).toBe(false);
        expect(result.current.errors).toEqual({
          title: 'タイトルは50文字以内で入力してください',
          body: undefined,
        });
      });
    });

    it('cancelで入力値が元に戻る', async () => {
      const { result } = renderHook(() => useContent(1));

      act(() => {
        result.current.change('title', '');
      });

      act(() => {
        result.current.change('body', '');
      });

      await act(async () => {
        return await result.current.update('title');
      });

      await act(async () => {
        return await result.current.update('body');
      });

      act(() => {
        result.current.cancel('title');
      });

      expect(result.current.inputValues).toEqual({
        title: initContent.title,
        body: '',
      });
      expect(result.current.errors).toEqual({
        title: undefined,
        body: expect.any(String),
      });
    });
  });

  describe('本文に対する入力と更新', () => {
    it('changeで入力値を更新する', () => {
      const { result } = renderHook(() => useContent(1));

      act(() => {
        result.current.change('title', 'new title');
      });

      expect(result.current.inputValues).toEqual({
        title: 'new title',
        body: initContent.body,
      });
    });

    describe('updateの検証', () => {
      test.each([10, 1000, 2000])(
        '本文が%d文字の場合は更新に成功する',
        async (len) => {
          const { result } = renderHook(() => useContent(1));

          const value = 'a'.repeat(len);

          act(() => {
            result.current.change('body', value);
          });

          const success = await act(async () => {
            return await result.current.update('body');
          });

          expect(success).toBe(true);
          expect(result.current.errors).toEqual({
            title: undefined,
            body: undefined,
          });

          expect(mockedFetch).toHaveBeenCalledWith(expect.any(String), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: value }),
          });

          expect(mockedMutate).toHaveBeenCalledWith(
            expect.any(String),
            Promise.resolve(updateResult),
          );
        },
      );

      describe('本文が10文字未満の場合は更新に失敗しエラーが設定される', () => {
        test.each([0, 9])('%d文字の場合', async (len) => {
          const { result } = renderHook(() => useContent(1));

          const value = len === 0 ? '' : 'a'.repeat(len);
          act(() => {
            result.current.change('body', value);
          });

          const success = await act(async () => {
            return await result.current.update('body');
          });

          expect(success).toBe(false);
          expect(result.current.errors).toEqual({
            title: undefined,
            body: '本文は10文字以上で入力してください',
          });
        });
      });

      it('本文が2000文字を超える場合は更新に失敗しエラーがセットされる', async () => {
        const { result } = renderHook(() => useContent(1));

        act(() => {
          result.current.change('body', 'a'.repeat(2001));
        });

        const success = await act(async () => {
          return await result.current.update('body');
        });

        expect(success).toBe(false);
        expect(result.current.errors).toEqual({
          title: undefined,
          body: '本文は2000文字以内で入力してください',
        });
      });
    });

    it('cancelで入力値が元に戻る', async () => {
      const { result } = renderHook(() => useContent(1));

      act(() => {
        result.current.change('title', '');
      });

      act(() => {
        result.current.change('body', '');
      });

      await act(async () => {
        return await result.current.update('title');
      });

      await act(async () => {
        return await result.current.update('body');
      });

      act(() => {
        result.current.cancel('body');
      });

      expect(result.current.inputValues).toEqual({
        title: '',
        body: initContent.body,
      });
      expect(result.current.errors).toEqual({
        title: expect.any(String),
        body: undefined,
      });
    });
  });
});
