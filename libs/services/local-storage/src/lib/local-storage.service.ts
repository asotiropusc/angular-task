import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    private readonly prefix = 'angular-task';

    private getKey (key: string): string {

        return `${this.prefix}${key}`;

    }

    getItem (key: string): string | null {

        if (this.isBrowser) {

            return localStorage.getItem(this.getKey(key));

        }

        return null;

    }

    setItem (key: string, value: string): void {

        if (this.isBrowser) {

            localStorage.setItem(this.getKey(key), value);

        }

    }

}
