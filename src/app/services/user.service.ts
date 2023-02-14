import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = "http://localhost/api/users"
  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(map((data: any) => data.data));
  }


  getSingleUser(id: any): Observable<User> {
    return this.http.get<User[]>(this.API_URL + '/' + id).pipe(map((data: any) => data.data));
  }


  addUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.API_URL, user);
  }


  updateUser(id: any, user: User): Observable<User[]> {
    return this.http.put<User[]>(this.API_URL + '/' + id, user);
  }



  deleteUser(id: any): Observable<User[]> {
    return this.http.delete<User[]>(this.API_URL + '/' + id);
  }

}
