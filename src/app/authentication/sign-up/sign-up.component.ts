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
  file: any
  image_url: any


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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/\d/), Validators.pattern(/[A-Z]/), Validators.pattern(/[a-z]/)]],
    });
  }

  createUserAccount() {
    const username = this.userForm?.get('username')?.value;
    const email = this.userForm?.get('email')?.value;
    const password = this.userForm?.get('password')?.value;

    if (this.currentFileUpload && this.currentFileUpload.file != null) {
      this.file = this.currentFileUpload.id
      this.image_url = this.currentFileUpload.file
    } else {
      this.file = 1
      // this.image_url = 'http://127.0.0.1:8000/media/profil.png'
      this.image_url = 'http://161.35.214.115/media/photodeprofile2.jpg'
    }

    this.user = {
      id: 0,
      username: username,
      email: email,
      password: password,
      file: this.file,
      image_url: this.image_url,
      is_superuser: false
    }

    this.usersService.createUser(this.user).subscribe( response => {
      console.log(response);
      this.router.navigate(['sign-in']);
      Swal.fire('Bienvenue', "Votre compte a bien été créé.", 'success');
    },
    error => {
      if (error.error.email) {
        Swal.fire('Erreur', "Un utilisateur avec cet email existe déjà.", 'error');
      } else if (error.error.username) {
        Swal.fire('Erreur', "Un utilisateur avec ce nom d'utilisateur existe déjà.", 'error');
      }
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
            else if (width / height < 1) {
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
