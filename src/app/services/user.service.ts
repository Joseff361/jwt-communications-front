import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../shared/user';
import { Client } from '../shared/client';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:3000';
  userTrack: User;
  users: User[];

  constructor(
    private http: HttpClient
  ) { 
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url + '/users');
  }

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url + '/clients');
  }

  async checkUser(userToCheck: any) {
    this.users = await this.getUsers().toPromise();
    console.log(this.users);
    this.users.forEach(user => {
        if(userToCheck.username == user.username && userToCheck.password == user.password){
          this.userTrack = user;
        }
    })
    return this.userTrack;

  }

  getClientByUser(userId: string): Observable<Client[]>{
    return this.http.get<Client[]>(this.url + "/clients/finduser/" + userId);
  }

  getUserById(id: string): Observable<Client>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.post<Client>(this.url + '/clientid ', {id: id}, httpOptions);
  }

}
