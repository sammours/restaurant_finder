
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    public baseUrl = 'http://localhost:44405';
    public clientId = '50e8d2e0-c8d3-4282-91a4-93df1c005eac';
    public headers: HttpHeaders;
    constructor() {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }
}
