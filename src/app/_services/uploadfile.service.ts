import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from '../_models/Fileupload.model';

const url = 'http://127.0.0.1:8000/api/upload-file/'

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http: HttpClient) { }

  uploadFile(data: any) {
    return this.http.post(url, data);
  }

  getFile() {
    return this.http.get<FileUpload[]>(url)
  }

  getSingleFile(id: any) {
    return this.http.get<FileUpload>(`${url}${id}`);
  }

  deleteFile(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
