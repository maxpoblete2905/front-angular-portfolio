import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseTestService {
  constructor(private firestore: Firestore) {}

  async testConnection(): Promise<boolean> {
    try {
      const snapshot = await getDocs(collection(this.firestore, 'test'));
      console.log('Conexión exitosa!', snapshot);
      return true;
    } catch (error) {
      console.error('Error de conexión:', error);
      return false;
    }
  }
}
