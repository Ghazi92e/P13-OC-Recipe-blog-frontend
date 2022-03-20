import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { Users } from '../../_models/Users.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userForm: FormGroup | any
  user: Users
  currentuser: any
  datatoken: any

  constructor(private usersService: UsersService, private router: Router, private formBuilder: FormBuilder) 
   { this.user = {
    id: 0,
    username: '',
    password: '',
    email: '',
    file: 1,
    image_url: ''
    }
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    this.initForm()
    if (this.currentuser == null) {
      console.log("je suis deco")
    } else {
      this.router.navigate(['recipes'])
      console.log("je suis co")
    }
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getCurrentUser() {
    const username = this.userForm?.get('username')?.value;
    const password = this.userForm?.get('password')?.value;
    this.user = new Users()
    this.user.username = username
    this.user.password = password
    
    this.usersService.getUserToken(this.user).subscribe( response => {
      console.log(response);
      this.datatoken = response
      if (this.datatoken) {
        localStorage.setItem('token', this.datatoken.token);
        this.currentuser = localStorage.getItem('token');
        console.log(this.currentuser)
      }
      
      if (this.currentuser !== null) {
        console.log("je suis connecté")
        this.router.navigate(['recipes']).then(() => {
          window.location.reload()
        })
      } else {
        console.log("je ne suis pas connécté")
      }
      // this.router.navigate(['']);
    },
    error => {
      console.log(error)
      console.log(error.error.email)
      console.log(error.error.username)
    })
  }

}
