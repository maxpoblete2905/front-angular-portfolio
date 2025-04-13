import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as crypto from 'crypto-js'; // Instala con: npm install crypto-js
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') baseUrl: string
  ) {
    this.apiUrl = baseUrl;
  }

  private generateApiKey(): string {
    const today = new Date();
    const datePart = `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`;
    return crypto.SHA256(`${datePart}:${environment.apiSecret}`).toString();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.generateApiKey()
    });
  }

  create(itemData: any): Observable<T> {
    return this.http.post<T>(this.apiUrl, itemData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, itemData: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, itemData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}