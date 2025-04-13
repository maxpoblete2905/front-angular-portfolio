import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL, listAll } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private storage = getStorage();
    constructor() { }

    async getFileUrl(filePath: string): Promise<string> {
        const fileRef = ref(this.storage, filePath);
        try {
            return await getDownloadURL(fileRef);
        } catch (error) {
            console.error(`Archivo no encontrado: ${filePath}`, error);
            throw new Error("Archivo no encontrado");
        }
    }
}
