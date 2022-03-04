import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../_models/Users.model';
import { Subject } from 'rxjs';

const url = 'http://127.0.0.1:8000/api-users/'
const user_auth = 'http://127.0.0.1:8000/api-token-auth/'
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  userFollowingsData = new Subject<object>();

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
    // var promise = new Promise<any>((resolve, rejected) => {
    //   setTimeout(() => {
    //     this.http.get<any>(`${url}${id}/recipes`).toPromise().then(( res: any) => {
    //       resolve(res)
    //     })
    //   }, 1000);
    // });
    // return promise
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

  getUserFollowingRecipes(data: any) {
    return this.http.post<any>(`${url}recipes_user_following/`, data)
  }

  getUserRecipesFollowing_by_category(data: any) {
    return this.http.post<any>(`${url}get_user_recipes_following_by_category/`, data)
  }

  searchRecipesByUserFollowing(data: any) {
    return this.http.post<any>(`${url}search_recipes_by_user_followings/`, data)
  }
}
