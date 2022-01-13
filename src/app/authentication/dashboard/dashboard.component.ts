import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/_models/Fileupload.model';
import { Users } from 'src/app/_models/Users.model';
import { UploadfileService } from 'src/app/_services/uploadfile.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  user: Users
  currentuser: any
  fileupload: FileUpload

  constructor(private usersService: UsersService, private uploadFileService: UploadfileService) 
  { this.user = {
    id: 0,
    username: '',
    password: '',
    email: '',
    file: 1, }

    this.fileupload = { id: 0, file: ''}
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    this.usersService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      console.log(this.user)
    })

    this.uploadFileService.getSingleFile(this.user.file).subscribe(data => {
      this.fileupload = data
      console.log("je suis le single file" + this.fileupload.file)
    })
  }

}
