'use client';

/**
 * next/navigation's params hooks under names that don't collide with the
 * react-router ones router-compat exports. Renamed by assignment, not with
 * an aliased named import (x as y): the published client bundler drops aliased named imports.
 */
import { useParams, useSearchParams } from 'next/navigation';

export const useNextParams = useParams;
export const useNextSearchParams = useSearchParams;
