import { IMovie } from './interface';
import { Movie } from './Movie';

export function MovieList({
  movies, onSelectMovie,
}: {
  movies: IMovie[];
  onSelectMovie: (id: string) => void;
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie: IMovie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
        ></Movie>
      ))}
    </ul>
  );
}
