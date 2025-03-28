import { useState, useCallback, SetStateAction } from 'react';

// simple hook to handle general api requests (CRUD)
export function useApi(endpoint: string) {
  const [data, setData] = useState([]); // expect an array/list
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (method: string, body:unknown = null, customEndpoint = '') => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${customEndpoint || endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || 'Something went wrong');

      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage as unknown as SetStateAction<null>);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const get = useCallback(async () => {
    const result = await request('GET');
    if (result) setData(result);
  }, [request]);

  const create = useCallback(async (body: unknown) => {
    await request('POST', body);
    get();
  }, [get, request]);

  const update = useCallback(async (id:string, body:unknown) => {
    await request('PUT', body, `${endpoint}/${id}`);
    get();
  }, [request, endpoint, get]);

  const remove = useCallback(async (id:string) => {
    await request('DELETE', null, `${endpoint}/${id}`);
    get();
  }, [request, endpoint, get]);

  return { data, error, loading, get, create, update, remove };
}