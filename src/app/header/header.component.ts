import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../_models/Users.model';
import { UsersService } from '../_services/users.service';
import { Output, EventEmitter } from '@angular/core';
import { RecipesService } from '../_services/recipes.service';
import { Subscription } from 'rxjs';
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
  datatest: any

  getFollowingUser: Subscription | any

  constructor(public router: Router, private userService: UsersService, private formBuilder: FormBuilder, private recipeService: RecipesService) { this.headerForm = this.formBuilder.group({recipedata: ['', Validators.required]}), this.user = { id: 0, username: '', password: '', email: '', file: 0, image_url: '', is_superuser: false } }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    if (this.currentuser == null) {
      console.log("je suis deco")
    } else {
      console.log("je suis co")
    }

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
  }
  

  getHeader() {
    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]

      this.getFollowingUser = this.userService.getFollowingUser(this.user.id).subscribe(data => {
        console.log(data)
        this.getUserFollowing = data

        let recipedata = this.headerForm?.get('recipedata')?.value;
        const UppercaseSearchbar = recipedata.charAt(0).toUpperCase() + recipedata.slice(1)
        console.log(UppercaseSearchbar)

        const obj = {
          "title": UppercaseSearchbar,
          "user__in": this.getUserFollowing
        }

        this.userService.searchRecipesByUserFollowing(obj).subscribe(data => {
          this.recipesFollowingsUserHeader = data
          console.log(this.recipesFollowingsUserHeader)
          this.recipeService.getDataSubjectRecipe.next(this.recipesFollowingsUserHeader)
        })
      })
    })
  }

  ngOnDestroy() {
    if(this.getFollowingUser) this.getFollowingUser.unsubscribe();
  }
}
