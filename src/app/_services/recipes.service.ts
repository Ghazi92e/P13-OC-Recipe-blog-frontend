import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../_models/Recipe.model';

const url = 'http://127.0.0.1:8000/api-recipes/'

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  constructor(private http: HttpClient) { }

  getAllRecipes() {
    return this.http.get<Recipe[]>(url)
  }

  createRecipe(data: any) {
    return this.http.post(url, data);
  }

  getSingleRecipe(id: any) {
    return this.http.get<Recipe>(`${url}${id}`);
  }

  deleteRecipe(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
