import { useEffect, useState } from 'react';
import { IWatched } from './interface';

export function useLocalStorageState(
  initialState: Array<IWatched>,
  key: string
): [Array<IWatched>, Function] {
  const [value, setWatched] = useState<IWatched[]>(function () {
    const storagedValue = localStorage.getItem('key');
    return storagedValue ? JSON.parse(storagedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setWatched];
}
