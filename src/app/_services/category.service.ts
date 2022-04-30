import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models/Category.model';

const url = 'http://161.35.214.115:80/api/categories/'
// const url = 'http://127.0.0.1:8000/api/categories/'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(url)
  }

  createCategory(data: any) {
    return this.http.post(url, data);
  }

  delete(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
