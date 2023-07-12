import { useState } from 'react';

const tempMovieData: IMovie[] = [
  {
    imdbID: 'tt1375666',
    title: 'Inception',
    year: '2010',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    title: 'The Matrix',
    year: '1999',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    title: 'Parasite',
    year: '2019',
    poster:
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
  title: string;
  year: string;
  poster: string;
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

const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: any) => acc + cur / arr.length,
    0
  );

function App() {
  const [movies, setMovies] = useState<IMovie[]>(tempMovieData);

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} />
    </>
  );
}

function NavBar({ movies }: { movies: IMovie[] }) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      <Search></Search>
      <Numresults movies={movies}></Numresults>
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

function Main({ movies }: { movies: IMovie[] }) {
  return (
    <main className="main">
      <ListBox movies={movies}></ListBox>
      <WatchBox></WatchBox>
    </main>
  );
}

export default App;
function ListBox({ movies }: { movies: IMovie[] }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && <MovieList movies={movies}></MovieList>}
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
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchBox() {
  const [watched, setWatched] = useState<IWatched[]>(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched}></WatchedSummary>
          <WatchedList watched={watched}></WatchedList>
        </>
      )}
    </div>
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
        <WatchedMovie movie={movie}></WatchedMovie>
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
