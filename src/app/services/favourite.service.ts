import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Favourite } from '../models/favourite.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FavouriteService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    /**
     * Get all Favourties per client
     * @returns Observable of Favourite array
     */
    public getAll(): Observable<Favourite[]> {
        return this.http.get(`${this.baseUrl}/api/Favourite?clientId=${this.clientId}`).pipe(
            map((res: Favourite[]) => res)
        );
    }

    /**
     * Add a restaurant to Favourite list
     * @param favourite The Favourite restaurant
     * @returns Observable of Favourite array after added
     */
    public add(favourite: Favourite): Observable<Favourite[]> {
        favourite.clientId = this.clientId;
        return this.http.post(`${this.baseUrl}/api/Favourite`, favourite, { headers: this.headers }).pipe(
            map((res: Favourite[]) => res)
        );
    }

    /**
     * Remove a restaurant from Favourite list
     * @param restaurantId The restuarant id to be deleted
     * @returns Observable of Favourite array after added
     */
    public delete(restaurantId: number): Observable<Favourite[]> {
        return this.http.delete(`${this.baseUrl}/api/Favourite/${restaurantId}/${this.clientId}`, { headers: this.headers }).pipe(
            map((res: Favourite[]) => res)
        );
    }
}
