
'use client';

import {
  onSnapshot,
  doc,
  type DocumentData,
} from 'firebase/firestore';
import { useEffect, useState, useMemo } from 'react';
import { useFirestore } from '@/firebase/provider';

export function useDoc<T extends DocumentData>(
  collectionName: string,
  docId: string
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const docRef = useMemo(() => {
    if (!firestore || !docId) return null;
    return doc(firestore, collectionName, docId);
  }, [firestore, collectionName, docId]);

  useEffect(() => {
    if (!docRef) {
        setLoading(false);
        return;
    };

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching document ${collectionName}/${docId}:`, error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef, collectionName, docId]);

  return { data, loading };
}
