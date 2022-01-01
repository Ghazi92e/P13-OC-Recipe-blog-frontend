import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../_models/Users.model';

const url = 'http://127.0.0.1:8000/api-users/'
const user_auth = 'http://127.0.0.1:8000/api-token-auth/'

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<Users[]>(url)
  }

  createUser(data: any) {
    return this.http.post(url, data);
  }

  getUserToken(data: any) {
    return this.http.post(user_auth, data);
  }

  getCurrentUser(user_token: string) {
    return this.http.get<Users[]>(`${url}?auth_token=${user_token}`);
  }
}
