import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../shared/user';
import { Client } from '../shared/client';

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

}
