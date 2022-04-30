import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../_models/Users.model';
import { Observable, Subject } from 'rxjs';

const url = 'http://161.35.214.115:80/api/users/'
const user_auth = 'http://161.35.214.115:80/api/token-auth/'
// const url = 'http://127.0.0.1:8000/api/users/'
// const user_auth = 'http://127.0.0.1:8000/api/token-auth/'

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  userFollowingsData = new Subject<object>();
  user_token: any

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<Users[]>(url)
  }

  createUser(data: any) {
    return this.http.post(url, data);
  }

  updateUser(id:any, data: any) {
    return this.http.put(`${url}${id}/`, data);
  }

  getUserToken(data: any) {
    return this.http.post(user_auth, data);
  }

  getCurrentUser(user_token: string) {
    return this.http.get<Users[]>(`${url}?auth_token=${user_token}`);
  }

  getAuthorizationToken() {
    this.user_token = localStorage.getItem('token');
    return this.user_token
  }

  getSingleUser(id: any) {
    return this.http.get<Users>(`${url}${id}`);
  }

  getFavoriteRecipesUser(id: any) {
    return this.http.get<any>(`${url}${id}/favorite_recipes`);
  }

  deleteFavoriterecipeUser(id: any, data: any) {
    return this.http.delete(`${url}${id}/favorite_recipes/`, data)
  }

  getRecipesUser(id: any) {
    return this.http.get<any>(`${url}${id}/recipes`)
  }

  getFollowingUser(id: any) {
    return this.http.get<any>(`${url}${id}/following`)
  }

  createFollowingUser(id: any, data: any) {
    return this.http.post<any>(`${url}${id}/following/`, data)
  }

  deleteFollowingUser(id: any, data: any) {
    return this.http.delete(`${url}${id}/following/`, data)
  }

  getUserFollowingRecipes(currentuserid: any) {
    return this.http.get<any>(`${url}${currentuserid}/recipes_user_following/`)
  }

  getUserRecipesFollowing_by_category(currentuserid: any, data: any): Observable<any> {
    return this.http.post(`${url}${currentuserid}/get_user_recipes_following_by_category/`, data)
  }

  searchRecipesByUserFollowing(data: any) {
    return this.http.post<any>(`${url}search_recipes_by_user_followings/`, data)
  }

  getCountUserFollower(id: any) {
    return this.http.get(`${url}${id}/count_user_follower`)
  }

  getCountUserFollowing(id: any) {
    return this.http.get(`${url}${id}/count_user_following`)
  }

  getCountUserRecipes(id: any) {
    return this.http.get(`${url}${id}/count_user_recipes`)
  }
}
