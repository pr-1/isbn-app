import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export abstract class ISBNApiService {
  constructor(private http: HttpClient) {
  }
  baseUrl = environment.ISBNApiBaseURL;
  protected get<T>(url: string, data: { [key: string]: string | number | boolean } = null): Observable<T> {
    let httpParams = new HttpParams();

    if (data) {
      Object.keys(data).forEach(key => {
        if (!isNullOrUndefined(data[key])) {
          httpParams = httpParams.append(key, data[key].toString());
        }
      });
    }

    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.get<T>(this.baseUrl + url, {
      params: httpParams,
      headers: headers
    }).pipe<T>(catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }
}
