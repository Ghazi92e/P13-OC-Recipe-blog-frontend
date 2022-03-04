import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../_models/Users.model';
import { UsersService } from '../_services/users.service';
import { Output, EventEmitter } from '@angular/core';
import { RecipesService } from '../_services/recipes.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentuser: any
  getUserFollowing: any[] = []
  currentFollowingUser: any
  headerForm: FormGroup
  user: Users

  recipesFollowingsUserHeader: any[] = []

  display = false

  datatest: any

  constructor(public router: Router, private userService: UsersService, private formBuilder: FormBuilder, private recipeService: RecipesService) { this.headerForm = this.formBuilder.group({recipedata: ['', Validators.required]}), this.user = { id: 0, username: '', password: '', email: '', file: 0, image_url: '' } }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    if (this.currentuser == null) {
      console.log("je suis deco")
    } else {
      console.log("je suis co")
    }

    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      this.getFollowingCurrentUser(this.user.id)
      console.log(this.user)
    })

    console.log(this.router.url)
  }

  signOut() {
    console.log("je suis dans signOut")
    localStorage.removeItem('token');
    this.router.navigate(['sign-in']).then(() => {
      window.location.reload()
    });
  }


  getFollowingCurrentUser(currentuserid: any) {
    console.log(currentuserid)
    this.getUserFollowing.push(currentuserid)
    this.userService.getFollowingUser(currentuserid).subscribe(data => {
      this.currentFollowingUser = data

      console.log(this.currentFollowingUser)
      
      for (let data of this.currentFollowingUser) {
        this.getUserFollowing.push(data.user_following[0])
      }
      console.log(this.getUserFollowing)
    })
  }
  

  getHeader() {
    let recipedata = this.headerForm?.get('recipedata')?.value;
    const UppercaseSearchbar = recipedata.charAt(0).toUpperCase() + recipedata.slice(1)
    console.log(UppercaseSearchbar)
    const obj = {
      "title": UppercaseSearchbar,
      "user__in": this.getUserFollowing
    }
    this.recipeService.subject.next(obj)
  }
}
