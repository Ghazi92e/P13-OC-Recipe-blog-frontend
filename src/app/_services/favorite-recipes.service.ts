import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteRecipe } from '../_models/FavoriteRecipe.model';

const url = 'http://161.35.214.115:80/api/favoriterecipe/'

@Injectable({
  providedIn: 'root'
})
export class FavoriteRecipesService {

  constructor(private http: HttpClient) { }

  getAllFavoriteRecipes() {
    return this.http.get<FavoriteRecipe[]>(url)
  }

  createFavoriteRecipe(data: any) {
    return this.http.post(url, data);
  }

  deleteFavoriteRecipe(id: any) {
    return this.http.delete(`${url}${id}`);
  }

  // findByFavRecipe(recipe: any) {
  //   return this.http.get<FavoriteRecipe[]>(`${url}?recipe=${recipe}`);
  // }
}
