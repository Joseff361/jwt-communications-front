import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../shared/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url:string = 'http://localhost:3000';
  Service: Service[];

  constructor(
    private http: HttpClient
  ) { }

  getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(this.url + '/services');
  }

  getService(id: string): Observable<Service>{
    return this.http.get<Service>(this.url + '/services/' + id);
  }
}



