
'use client';

import {
  onSnapshot,
  collection,
  query,
  where,
  type DocumentData,
  type CollectionReference,
  type Query,
} from 'firebase/firestore';
import { useEffect, useState, useMemo } from 'react';
import { useFirestore } from '@/firebase/provider';

export function useCollection<T extends DocumentData>(
  collectionName: string,
  options?: {
    where?: [string, '==', any];
  }
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const collectionRef = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, collectionName);
  }, [firestore, collectionName]);

  const queryRef = useMemo(() => {
    if (!collectionRef) return null;
    if (options?.where) {
      return query(collectionRef, where(...options.where));
    }
    return collectionRef;
  }, [collectionRef, options?.where]);

  useEffect(() => {
    if (!queryRef) {
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
        console.error(`Error fetching collection ${collectionName}:`, error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [queryRef, collectionName]);

  return { data, loading };
}
