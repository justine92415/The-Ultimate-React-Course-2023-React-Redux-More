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
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';

export const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: any) => acc + cur / arr.length,
    0
  );

function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddToWatched(movie: IWatched) {
    setWatched((watched:IWatched[]) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched:IWatched[]) => watched.filter((movie) => movie.imdbID !== id));
  }

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
