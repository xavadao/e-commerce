'use client';

import { createContext, Suspense, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchContext = createContext('');

function SearchSync({ onChange }: { onChange: (value: string) => void }) {
  const search = useSearchParams().toString();
  useEffect(() => onChange(search), [search, onChange]);
  return null;
}

export function SearchParamsProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('');
  return (
    <SearchContext.Provider value={search}>
      {/* Only query synchronization waits for the browser; page content stays in initial HTML. */}
      <Suspense fallback={null}><SearchSync onChange={setSearch} /></Suspense>
      {children}
    </SearchContext.Provider>
  );
}

export function useCurrentSearchParams() {
  const search = useContext(SearchContext);
  return useMemo(() => new URLSearchParams(search), [search]);
}
