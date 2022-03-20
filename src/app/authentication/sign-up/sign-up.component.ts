import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { Users } from '../../_models/Users.model';
import { UploadfileService } from 'src/app/_services/uploadfile.service';
import { FileUpload } from 'src/app/_models/Fileupload.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  user: Users
  userForm: FormGroup | any;
  currentFileUpload: FileUpload | any;



  constructor(private usersService: UsersService, private router: Router, private formBuilder: FormBuilder, private uploadFileService: UploadfileService) {
    this.user = {
      id: 0,
      username: '',
      password: '',
      email: '',
      file: 0,
      image_url: '',
      is_superuser: false
    }
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  createUserAccount() {
    const username = this.userForm?.get('username')?.value;
    const email = this.userForm?.get('email')?.value;
    const password = this.userForm?.get('password')?.value;

    let file
    let image_url

    if (this.currentFileUpload && this.currentFileUpload.file != null) {
      file = this.currentFileUpload.id
      image_url = this.currentFileUpload.file
    } else {
      file = 1
      image_url = 'http://127.0.0.1:8000/media/profil.png'
    }

    this.user = {
      id: 0,
      username: username,
      email: email,
      password: password,
      file: file,
      image_url: image_url,
      is_superuser: false
    }

    console.log(this.user)
    this.usersService.createUser(this.user).subscribe( response => {
      console.log(response);
      this.router.navigate(['sign-in']);
    },
    error => {
      console.log(error)
      console.log(error.error.email)
      console.log(error.error.username)
    })
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
            else {
              this.currentFileUpload = event.target.files[0]
              this.upload()
            }
          };
        };
      }
    }
  }

  upload() {
    console.log(this.user.file)
    const formData = new FormData();
    formData.append('file', this.currentFileUpload)
    this.uploadFileService.uploadFile(formData).subscribe(data => {
      this.currentFileUpload = data
      console.log("file Uploaded")
    }, error => {
      console.log(error)
    })
  }
}
