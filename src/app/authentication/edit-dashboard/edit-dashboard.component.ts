import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/_models/Users.model';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent implements OnInit {
  
  user: Users
  userForm: FormGroup | any;
  currentuser: any


  constructor(private formBuilder: FormBuilder, private userService: UsersService) {
    this.user = {
      id: 0,
      username: '',
      password: '',
      email: '',
      file: 0,
      image_url: ''
    }
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      console.log(this.user)
      this.userForm.setValue({username: this.user.username})
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

}
