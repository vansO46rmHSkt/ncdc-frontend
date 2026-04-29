import { buildApiUrl, fetcher } from '@/lib/api';
import useSWR, { useSWRConfig } from 'swr';
import type { Content } from './Content';
import { useCallback, useState } from 'react';
import { apiKey as contentApiKey } from './useContents';

const buildApiKey = (id: number) => buildApiUrl(`content/${id}`);

interface Errors {
  title: string | undefined;
  body: string | undefined;
}

interface InputValues {
  title: string;
  body: string;
}
type InputTarget = keyof InputValues;

export const useContent = (id: number) => {
  const apiKey = buildApiKey(id);
  const { mutate } = useSWRConfig();

  const { data } = useSWR(apiKey, fetcher<Content>, {
    suspense: true,
  });

  const [inputValues, setInputValues] = useState<{
    title: string;
    body: string;
  }>({
    title: data.title ?? '',
    body: data.body ?? '',
  });

  const [errors, setErrors] = useState<Errors>({
    title: undefined,
    body: undefined,
  });

  const validate = useCallback(
    (target: InputTarget): boolean => {
      const valueLength = inputValues[target].length;
      switch (target) {
        case 'title': {
          if (valueLength < 1) {
            setErrors((prev) => ({
              ...prev,
              title: 'タイトルは1文字以上で入力してください',
            }));
            return false;
          }
          if (valueLength > 50) {
            setErrors((prev) => ({
              ...prev,
              title: 'タイトルは50文字以内で入力してください',
            }));
            return false;
          }
          setErrors((prev) => ({
            ...prev,
            title: undefined,
          }));
          return true;
        }
        case 'body': {
          if (valueLength < 10) {
            setErrors((prev) => ({
              ...prev,
              body: '本文は10文字以上で入力してください',
            }));
            return false;
          }
          if (valueLength > 2000) {
            setErrors((prev) => ({
              ...prev,
              body: '本文は2000文字以内で入力してください',
            }));
            return false;
          }
          setErrors((prev) => ({
            ...prev,
            body: undefined,
          }));
          return true;
        }
        default: {
          target satisfies never;
          return false;
        }
      }
    },
    [inputValues],
  );

  const cancel = useCallback(
    (target: InputTarget) => {
      setInputValues((prev) => ({ ...prev, [target]: data[target] ?? '' }));
      setErrors((prev) => ({
        ...prev,
        [target]: undefined,
      }));
    },
    [data],
  );

  const change = useCallback((target: InputTarget, value: string) => {
    setInputValues((prev) => ({ ...prev, [target]: value }));
  }, []);

  const update = useCallback(
    async (target: InputTarget): Promise<boolean> => {
      if (!validate(target)) {
        return false;
      }

      const result = await fetch(apiKey, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [target]: inputValues[target] }),
      });

      await Promise.all([mutate(apiKey, result.json()), mutate(contentApiKey)]);

      return true;
    },
    [apiKey, inputValues, mutate, validate],
  );

  return {
    content: data,
    inputValues,
    errors,
    change,
    update,
    cancel,
  };
};
