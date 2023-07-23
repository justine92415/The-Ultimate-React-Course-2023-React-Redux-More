import { IWatched } from './interface';
import { average } from './App';

export function WatchedSummary({ watched }: { watched: IWatched[]; }) {
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
