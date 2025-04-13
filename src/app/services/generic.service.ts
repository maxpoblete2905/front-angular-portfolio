import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  // ... (resto de los métodos permanecen igual)
  create(itemData: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<T>(this.apiUrl, itemData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, itemData: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<T>(`${this.apiUrl}/${id}`, itemData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}