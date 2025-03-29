import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setNotes, setLoading, setError } from '@/store/slices/notesSlice';

// simple hook to handle general api requests (CRUD)
export function useApiNotes() {
  const endpoint = '/api/notes';

  const dispatch = useAppDispatch();

  const request = useCallback(async (method: string, body:unknown = null, customEndpoint = '') => {
    // setLoading(true);
    setError('');

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
      setError(errorMessage);
      return null;
    } 
  }, [endpoint]);

  const get = useCallback(async () => {
    dispatch(setLoading(true));
    const result = await request('GET');
    if (result) {
      dispatch(setNotes(result));
    }
  }, [dispatch, request]);

  const create = useCallback(async (body: unknown) => {
    dispatch(setLoading(true));
    await request('POST', body);
    get();
  }, [get, request, dispatch]);

  const update = useCallback(async (id:string, body:unknown) => {
    await request('PUT', body, `${endpoint}/${id}`);
    get();
  }, [request, endpoint, get]);

  const remove = useCallback(async (id:string) => {
    dispatch(setLoading(true));
    await request('DELETE', null, `${endpoint}/${id}`);
    get();
  }, [dispatch, request, get]);

  return { get, create, update, remove };
}