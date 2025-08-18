import { Inject, Injectable, inject } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable()
export class GenericService<T extends { id?: string }> {
  private firestore: Firestore = inject(Firestore);

  constructor(@Inject(String) protected collectionName: string) { }

  create(itemData: Omit<T, 'id'>): Observable<T> {
    const collectionRef = collection(this.firestore, this.collectionName);
    return from(addDoc(collectionRef, itemData)).pipe(
      map(docRef => ({ id: docRef.id, ...itemData } as T)),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<T[]> {
    const collectionRef = collection(this.firestore, this.collectionName);
    return from(getDocs(collectionRef)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
      ),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return from(getDoc(docRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() } as T;
        }
        throw new Error('Document not found');
      }),
      catchError(this.handleError)
    );
  }

  update(item: T): Observable<T> {
    if (!item.id) {
      return throwError(() => new Error('Cannot update item without ID'));
    }

    const { id, ...itemData } = item;
    const docRef = doc(this.firestore, this.collectionName, id);
    return from(updateDoc(docRef, itemData)).pipe(
      map(() => item),
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return from(deleteDoc(docRef)).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Firestore error:', error);
    return throwError(() => new Error(error.message || 'Firestore operation failed'));
  }
}
