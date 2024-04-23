import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';
import { BaseService } from './base.service';
import { Geolocation, Coordinates } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService extends BaseService {
    public coords = <Coordinates> {
        latitude: 0,
        longitude: 0
    };
    constructor(private http: HttpClient, private geolocation: Geolocation) {
        super();
    }

    /**
     * Get all restaurants
     * @returns Observable of restaurants
     */
    public getAll(): Observable<Restaurant[]> {
        return this.http.get(`${this.baseUrl}/api/Restaurant?lat=${this.coords.latitude}&lng=${this.coords.longitude}`).pipe(
            map((res: Restaurant[]) => res)
        );
    }

    /**
     * Get a restaurant by id
     * @param id the restaurant id
     * @returns Observable of a restaurant
     */
    public getById(id: string): Observable<Restaurant> {
        return this.http.get(`${this.baseUrl}/api/Restaurant/${id}`).pipe(
            map((res: Restaurant) => res)
        );
    }

    public calculateCoords() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.coords = resp.coords;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
}
