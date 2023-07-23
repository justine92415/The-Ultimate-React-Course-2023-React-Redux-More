import { IMovie } from './interface';

export function Numresults({ movies }: { movies: IMovie[]; }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
