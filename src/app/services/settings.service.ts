import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Favourite } from '../models/favourite.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Setting } from '../models/settings.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    /**
     * Get all settings
     * @returns Observable of settings
     */
    public getAll(): Observable<Setting[]> {
        return this.http.get(`${this.baseUrl}/api/Settings?clientId=${this.clientId}`).pipe(
            map((res: Setting[]) => res)
        );
    }

    /**
     * Update the settings
     * @param settings a list of settings to be updated
     * @returns Observable of settings after update
     */
    public update(settings: Setting[]): Observable<Setting[]> {
        settings = settings.map(set => {
            set.clientId = this.clientId;
            return set;
        });
        return this.http.put(`${this.baseUrl}/api/Settings`, settings).pipe(
            map((res: Setting[]) => res)
        );
    }
}
