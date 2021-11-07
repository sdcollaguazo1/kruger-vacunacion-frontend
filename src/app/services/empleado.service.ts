import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Empleado } from '../entities/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios'

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getListEmpleados(pageNumber: number): Observable<any> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('limit', '10');

    return this.http.get(this.urlEndPoint, { params }).pipe(
      map(
        (response: any) => response
      ),
      catchError(
        e => {
          return throwError(e);
        }
      ),
    );
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.urlEndPoint, empleado).pipe(
      map((response: any) => response.usuario as Empleado),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      }
      )
    );
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/empleado'])

        return throwError(e);
      })
    );
  }

  update(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.urlEndPoint}/${empleado.id}`, empleado).pipe(
      map((response: any) => response.usuario as Empleado),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        return throwError(e);
      }
      )
    );
  }

  delete(id: number): Observable<Empleado> {
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/empleado'])
        return throwError(e);
      }
      )
    )
  }
}
