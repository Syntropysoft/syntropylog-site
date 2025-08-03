'use client';

import { useLoading } from '../hooks/useLoading';
import LoadingSpinner from './LoadingSpinner';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const isLoading = useLoading(2000); // Show loading for at least 2 seconds

  return (
    <>
      {isLoading && <LoadingSpinner text="Cargando SyntropySoft..." />}
      <div className={`page-transition ${!isLoading ? 'loaded' : ''}`}>
        {children}
      </div>
    </>
  );
} 