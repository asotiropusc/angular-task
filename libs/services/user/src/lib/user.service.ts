import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, ApiResponse } from './models/user.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private http = inject(HttpClient);
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

    private toApiResponse = <T>(data: T): ApiResponse<T> => ({
        success: true,
        data,
    });
    private toApiError = <T>(error: unknown): Observable<ApiResponse<T>> => {

        console.error(`Error:`, error);
        return of({
            success: false,
            data: null
        } as ApiResponse<T>);

    };

    getUsers (): Observable<ApiResponse<User[]>> {

        return this.http
        .get<User[]>(`${this.baseUrl}/users`)
        .pipe(map(this.toApiResponse), catchError(this.toApiError<User[]>));

    }

}
