import { useEffect, useState } from 'react';
import { IMovie } from './interface';

export const KEY = '9588565';

export function useMovies(query: string) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchData() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');
          const data = await res.json();
          if (data.Response === 'False') throw new Error(data.Error);
          setMovies(data.Search);
          setError('');
        } catch (error: any) {
          console.log(error.message);
          if (error.name !== 'AbortError') {
            setError(error.message);
            console.log('testQQ');
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
      fetchData();
      return () => controller.abort();
    },
    [query]
  );

  return { movies, isLoading, error };
}
