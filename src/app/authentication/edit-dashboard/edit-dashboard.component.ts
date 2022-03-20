import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/_models/Fileupload.model';
import { Users } from 'src/app/_models/Users.model';
import { UploadfileService } from 'src/app/_services/uploadfile.service';
import { UsersService } from 'src/app/_services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent implements OnInit {
  
  user: Users
  userForm: FormGroup | any;
  currentuser: any
  currentFileUpload: FileUpload | any;
  fileUploaded = false
  messageFileUploaded: string

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private uploadFileService: UploadfileService, private router: Router) {
    this.user = {
      id: 0,
      username: '',
      password: '',
      email: '',
      file: 0,
      image_url: '',
      is_superuser: false
    }

    this.messageFileUploaded = ''
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      console.log(this.user)
      // this.userForm.setValue({username: this.user.username})
    })
    this.initForm()

  }

  initForm() {
    console.log(this.user.username)
    this.userForm = new FormGroup({
      username: new FormControl()
      // email: [this.user.email, Validators.required],
      // image_url: [this.user.image_url]
    });
  }

  editUserImageAccount() {
    console.log(this.currentFileUpload)
    if (this.currentFileUpload && this.currentFileUpload.file && this.currentFileUpload.id) {
      this.user.image_url = this.currentFileUpload.file
      this.user.file = this.currentFileUpload.id
      console.log(this.user)
      this.userService.updateUser(this.user.id, this.user).subscribe(data => {
        console.log(data)
        this.router.navigate(['dashboard'])
      }, error => {
        console.log(error)
      })
    }
  }

  onChange(event: any) {
    if (event.target.files && event.target.files.length) {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            console.log('Width and Height', width, height);
            console.log(event.target.files[0].size)
            if (event.target.files[0].size > 350000) {
              console.log(event.target.files[0].size)
              Swal.fire('Erreur image', "Image trop lourde", 'error');
            }
            else if (width / height < 0.9) {
              Swal.fire('Erreur image', "Dimension de l'image non conforme", 'error');
            }
            else if (width < 100 ) {
              Swal.fire('Erreur image', "Image trop petite", 'error');
            }
            else {
              this.currentFileUpload = event.target.files[0]
              this.upload()
            }
          };
        };
      }
    }
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];      
    //   this.recipeForm.get('file').setValue(file);
    // }
  }

  upload() {
    const formData = new FormData();
    formData.append('file', this.currentFileUpload)
    console.log("je suis le currentFileUpload" + this.currentFileUpload.name)
    console.log("je suis l' url de currentFileUpload" + this.currentFileUpload.url)
    console.log("je suis l'id de l'image" + this.currentFileUpload.id)
    this.uploadFileService.uploadFile(formData).subscribe(data => {
      this.currentFileUpload = data
      console.log(this.currentFileUpload)
      console.log(this.currentFileUpload.file)
      console.log("file Uploaded")
      this.fileUploaded = true
      this.messageFileUploaded = "Image téléchargée"
    }, error => {
      console.log(error)
    })
  }

}
