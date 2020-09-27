import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  url:string = 'http://localhost:3000';


  constructor(
    private http: HttpClient
  ) { }

  addClaim(claim: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.post<any>(this.url + '/clients/claim', claim, httpOptions);
  }   

  removeClaim(claim: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.post<any>(this.url + '/clients/deleteclaim', claim, httpOptions);
  }

  replyClaim(reply: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.put<any>(this.url + '/clients/updateClaim', reply, httpOptions);
  }

}
