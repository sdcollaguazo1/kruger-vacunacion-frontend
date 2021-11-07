import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vacuna } from '../entities/vacuna';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

  private urlEndPoint: string = 'http://localhost:8080/api/vacunas'
  constructor(
    private http: HttpClient,
  ) { }

  getListVacunas(): Observable<any> {

    return this.http.get(this.urlEndPoint).pipe(
      map(
        (response) => response as Vacuna[]
      ),
      catchError(
        e => {
          return throwError(e);
        }
      ),
    );
  }
}
