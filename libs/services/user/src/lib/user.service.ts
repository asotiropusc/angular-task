import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User, ApiResponse } from './models/user.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private http = inject(HttpClient);
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

    // TODO: review this error handling...may be better to return some kind of error code
    private toApiResponse = <T>(data: T): ApiResponse<T> => ({
        success: true,
        data,
    });
    private toApiError = <T>(error: any): Observable<ApiResponse<T>> => {

        console.error(`Error:`, error);
        return of({
            success: false,
        } as ApiResponse<T>);

    };

    getUsers (): Observable<ApiResponse<User[]>> {

        return this.http
        .get<User[]>(`${this.baseUrl}/users`)
        .pipe(map(this.toApiResponse), catchError(this.toApiError<User[]>));

    }

    getUser (id: number): Observable<ApiResponse<User>> {

        const params = new HttpParams().set('id', id.toString());
        return this.http
        .get<User>(`${this.baseUrl}/users`, { params })
        .pipe(map(this.toApiResponse), catchError(this.toApiError<User>));

    }

}
