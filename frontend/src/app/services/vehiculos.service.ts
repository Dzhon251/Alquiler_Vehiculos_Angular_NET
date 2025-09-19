import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehiculos } from '../interfaces/i-vehiculos';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private readonly apiUrl = 'https://localhost:7126/api/Vehiculos';

  constructor(
    private http: HttpClient,
  ) { }

  getVehiculos(): Observable<IVehiculos[]> {
    var vehiculos = this.http.get<IVehiculos[]>(this.apiUrl).pipe(catchError(this.manejoError));
    console.log(vehiculos);
    return vehiculos;
  }

  manejoError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || "Error de red"
    return throwError(() => {
      new Error(msg);
    })
  }

  postVehiculo(vehiculo: IVehiculos): Observable<IVehiculos> {
    return this.http
      .post<IVehiculos>(this.apiUrl, vehiculo)
      .pipe(catchError(this.manejoError));
  }

  putVehiculo(vehiculo: IVehiculos): Observable<IVehiculos> {
    return this.http
      .put<IVehiculos>(`${this.apiUrl}/${vehiculo.id}`, vehiculo)
      .pipe(catchError(this.manejoError));
  }

  unVehiculo(id: number): Observable<IVehiculos> {
    return this.http.get<IVehiculos>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejoError)
    );
  }

  eliminarVehiculo(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejoError)
    );
  }

}
