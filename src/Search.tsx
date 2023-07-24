import { useEffect, useRef } from 'react';

export function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(function () {
    function callback(e: KeyboardEvent) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === 'Enter') {
        inputEl.current!.focus();
        setQuery('');
      }
    }

    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
