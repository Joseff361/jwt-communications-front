import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../shared/services';
import { HttpHeaders } from '@angular/common/http';


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

  addService(service: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.put<any>(this.url + '/clients/service', service, httpOptions );
  }

  deleteService(service: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.post<any>(this.url + '/clients/removeservice', service, httpOptions );
  }


  replyService(reply: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.put<any>(this.url + '/clients/setservicestate', reply, httpOptions);
  } 

}



