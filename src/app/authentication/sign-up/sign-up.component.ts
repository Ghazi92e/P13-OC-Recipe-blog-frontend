import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { Users } from '../../_models/Users.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  user: Users
  userForm: FormGroup | any;


  constructor(private usersService: UsersService, private router: Router, private formBuilder: FormBuilder) {
    this.user = {
      id: 0,
      username: '',
      password: '',
      email: '',
    }
  }

  ngOnInit(): void {
    // this.usersService.getAllUsers().subscribe(data => {
    //   this.users = data
    // })
    this.initForm()

    // this.usersService.getUserToken
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
    this.user = new Users()
    this.user.username = username
    this.user.email = email
    this.user.password = password
    console.log(this.user)
    this.usersService.createUser(this.user).subscribe( response => {
      console.log(response);
      this.router.navigate(['recipes']);
    },
    error => {
      console.log(error)
      console.log(error.error.email)
      console.log(error.error.username)
    })
  }
}
