// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as crypto from 'crypto-js'; // Instala con: npm install crypto-js

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly SECRET = 'TU_SECRETO_COMPARTIDO';

    private generateApiKey(): string {
        const today = new Date();
        const datePart = `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`;
        return crypto.SHA256(`${datePart}:${this.SECRET}`).toString();
    }

}