import { IWatched } from './interface';
import { WatchedMovie } from './WatchedMovie';

export function WatchedList({
  watched,
  onDeleteWatched,
}: {
  watched: IWatched[];
  onDeleteWatched: (id: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie: IWatched) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}></WatchedMovie>
      ))}
    </ul>
  );
}
