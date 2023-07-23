import { useEffect, useState } from 'react';

const tempMovieData: IMovie[] = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData: IWatched[] = [
  {
    imdbID: 'tt1375666',
    title: 'Inception',
    year: '2010',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    title: 'Back to the Future',
    year: '1985',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface IWatched {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

interface IErrorObj {
  Response: string;
  Error: string;
}

const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: any) => acc + cur / arr.length,
    0
  );

const KEY = '9588565';

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [watched, setWatched] = useState<IWatched[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // const query = 'asdfafdsf12313';
  const query = 'interstellar';

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}}`
        );
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');
        const data = await res.json();
        if (data.Response === 'False') throw new Error(data.Error);
        setMovies(data.Search);
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <NavBar>
        <Logo></Logo>
        <Search></Search>
        <Numresults movies={movies}></Numresults>
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies}></MovieList>} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies}></MovieList>}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched}></WatchedSummary>
          <WatchedList watched={watched}></WatchedList>
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <div className="loader">Loading...</div>;
}

function ErrorMessage({ error: message }: { error: string }) {
  return <div className="error">{message}</div>;
}

function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="nav-bar">
      <span>⛔</span>
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState('');
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Numresults({ movies }: { movies: IMovie[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return <main className="main">{children}</main>;
}

export default App;
function Box({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies }: { movies: IMovie[] }) {
  return (
    <ul className="list">
      {movies?.map((movie: IMovie) => (
        <Movie movie={movie} key={movie.imdbID}></Movie>
      ))}
    </ul>
  );
}

function Movie({ movie }: { movie: IMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }: { watched: IWatched[] }) {
  const avgImdbRating = average(
    watched.map((movie: IWatched) => movie.imdbRating)
  );
  const avgUserRating = average(
    watched.map((movie: IWatched) => movie.userRating)
  );
  const avgRuntime = average(watched.map((movie: IWatched) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched }: { watched: IWatched[] }) {
  return (
    <ul className="list">
      {watched.map((movie: IWatched) => (
        <WatchedMovie movie={movie} key={movie.imdbID}></WatchedMovie>
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }: { movie: IWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
