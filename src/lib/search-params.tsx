'use client';

import { createContext, Suspense, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const SearchContext = createContext('');

type SearchSnapshot = { pathname: string; search: string };

function SearchSync({ onChange }: { onChange: (value: SearchSnapshot) => void }) {
  const pathname = usePathname() ?? '/';
  const search = useSearchParams().toString();
  useEffect(() => onChange({ pathname, search }), [pathname, search, onChange]);
  return null;
}

export function SearchParamsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/';
  const [snapshot, setSnapshot] = useState<SearchSnapshot>({ pathname: '', search: '' });
  // A new route must never read the previous route's query before synchronization.
  const search = snapshot.pathname === pathname ? snapshot.search : '';
  return (
    <SearchContext.Provider value={search}>
      {/* Only query synchronization waits for the browser; page content stays in initial HTML. */}
      <Suspense fallback={null}><SearchSync onChange={setSnapshot} /></Suspense>
      {children}
    </SearchContext.Provider>
  );
}

export function useCurrentSearchParams() {
  const search = useContext(SearchContext);
  return useMemo(() => new URLSearchParams(search), [search]);
}
