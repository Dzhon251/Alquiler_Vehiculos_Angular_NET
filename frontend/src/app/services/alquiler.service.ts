import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAlquiler } from '../interfaces/i-alquiler';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private readonly apiUrl = 'https://localhost:7126/api/Alquileres';

  constructor(private http: HttpClient) { }

  getAlquileres(): Observable<IAlquiler[]> {
    return this.http.get<IAlquiler[]>(this.apiUrl)
      .pipe(
        catchError(this.manejoError)
      );
  }

  unAlquiler(id: number): Observable<IAlquiler> {
    return this.http.get<IAlquiler>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.manejoError));
  }

  postAlquiler(alquiler: IAlquiler): Observable<IAlquiler> {
    return this.http.post<IAlquiler>(this.apiUrl, alquiler)
      .pipe(catchError(this.manejoError));
  }

  putAlquiler(alquiler: IAlquiler): Observable<IAlquiler> {
    return this.http.put<IAlquiler>(`${this.apiUrl}/${alquiler.id}`, alquiler)
      .pipe(catchError(this.manejoError));
  }

  eliminarAlquiler(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.manejoError));
  }

  private manejoError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || "Error de red";
    return throwError(() => new Error(msg));
  }
}
