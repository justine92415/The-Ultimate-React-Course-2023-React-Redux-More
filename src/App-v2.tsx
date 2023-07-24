import { useEffect, useState } from 'react';
import { IMovie, IWatched } from './interface';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { NavBar } from './NavBar';
import { Logo } from './Logo';
import { Search } from './Search';
import { Numresults } from './Numresults';
import { Main } from './Main';
import { Box } from './Box';
import { MovieList } from './MovieList';
import { MovieDetails } from './MovieDetails';
import { WatchedSummary } from './WatchedSummary';
import { WatchedList } from './WatchedList';

export const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: any) => acc + cur / arr.length,
    0
  );

export const KEY = '9588565';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [watched, setWatched] = useState<IWatched[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
 

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddToWatched(movie: IWatched) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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
      handleCloseMovie();
      fetchData();
      return () => controller.abort();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo></Logo>
        <Search query={query} setQuery={setQuery}></Search>
        <Numresults movies={movies}></Numresults>
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies}></MovieList>} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            ></MovieList>
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              ></WatchedList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
