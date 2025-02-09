import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from './user-details';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/api/employees';
  apiUrl_ = 'http://localhost:3000/api/login';
  register= 'http://localhost:3000/api/register';

  
  getUser(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.apiUrl}`);
  }
  login(login_values: any): Observable<any> {
    return this.http.post(this.apiUrl_, login_values);  // Correct URL and request body
}

  registerUser(user: any): Observable<any> {
  return this.http.post(this.register, user);  
}
}
