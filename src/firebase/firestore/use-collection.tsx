
'use client';

import {
  onSnapshot,
  collection,
  query,
  where,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import { useEffect, useState, useMemo } from 'react';
import { useFirestore } from '@/firebase/provider';

export function useCollection<T extends DocumentData>(
  path: string | null,
  options?: {
    where?: [string, '==', any];
  }
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const collectionRef = useMemo(() => {
    if (!firestore || !path) return null;
    return collection(firestore, path);
  }, [firestore, path]);

  const queryRef: Query | null = useMemo(() => {
    if (!collectionRef) return null;
    if (options?.where) {
      return query(collectionRef, where(...options.where));
    }
    return collectionRef;
  }, [collectionRef, options?.where]);

  useEffect(() => {
    if (!queryRef) {
        setData([]);
        setLoading(false);
        return;
    };

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching collection ${path}:`, error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [queryRef, path]);

  return { data, loading };
}
