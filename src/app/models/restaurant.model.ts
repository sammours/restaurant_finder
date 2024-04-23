import { Review } from './restaurant-review.model';

export class Restaurant {
    public id: number;
    public name: string;
    public neighborhood: string;
    public photo: string;
    public cuisineType: string;
    public monday: string;
    public tuesday: string;
    public wednesday: string;
    public thursday: string;
    public friday: string;
    public saturday: string;
    public sunday: string;
    public reviews: Review[];
    public street: string;
    public postalCode: string;
    public city: string;
    public country: string;
    public lat: number;
    public lng: number;
    public distance: number;
    public rating: number;
}
