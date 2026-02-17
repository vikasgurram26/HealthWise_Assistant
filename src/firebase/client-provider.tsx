
'use client';

import { ReactNode, useMemo } from 'react';
import { FirebaseProvider, type FirebaseServices } from './provider';
import { initializeFirebase } from '.';

export function FirebaseClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const firebaseServices = useMemo<FirebaseServices | null>(() => {
    if (typeof window !== 'undefined') {
      return initializeFirebase();
    }
    return null;
  }, []);

  return <FirebaseProvider services={firebaseServices}>{children}</FirebaseProvider>;
}

