import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../_models/Comment.model';

const url = 'http://161.35.214.115:80/api/comment/'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAllComment() {
    return this.http.get<Comment[]>(url)
  }

  createComment(data: any) {
    return this.http.post(url, data);
  }

  deleteComment(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
