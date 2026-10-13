'use client';

import { useParams } from 'next/navigation';
import { useCurrentSearchParams } from './search-params';

export const useNextParams = useParams;
export const useNextSearchParams = useCurrentSearchParams;
