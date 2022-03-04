import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { Recipe } from '../../_models/Recipe.model';
import { Users } from '../../_models/Users.model';
import { RecipesService } from '../../_services/recipes.service';
import { UploadfileService } from 'src/app/_services/uploadfile.service';
import { FileUpload } from 'src/app/_models/Fileupload.model';
import { FavoriteRecipe } from 'src/app/_models/FavoriteRecipe.model';
import { FavoriteRecipesService } from 'src/app/_services/favorite-recipes.service';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/Category.model';
import { interval } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  currentuser: any
  user: Users
  allUsers: Users[] = []
  allCategories: Category[] = []
  addfavRecipe: FavoriteRecipe
  p: number = 1;

  dataEventCategories: number[] = []

  currentFollowingUser: any

  recipesFollowingsUser: any[] = []

  getUserFollowing: any[] = []

  constructor(private recipesService: RecipesService, private userService: UsersService, private router: Router, private uploadFileService: UploadfileService, private favoriteRecipeService: FavoriteRecipesService, private categoryService: CategoryService) {
    this.user = { id: 0, username: '', password: '', email: '', file: 0, image_url: '' }
    this.addfavRecipe = { id: 0, user: 0, recipe: 0 }
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    if (this.currentuser == null) {
      console.log("je suis deco")
      this.router.navigate(['sign-in'])
    } else {
      console.log("je suis co")
    }
  
    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      this.getFollowingCurrentUser(this.user.id)
      console.log(this.user)
    })

    this.categoryService.getAllCategories().subscribe(data => {
      console.log(data)
      this.allCategories = data
    })
  }

  onViewRecipe(id: number) {
    this.router.navigate(['/recipe', 'view', id]);
  }

  getRecipeCategory(event: any) {
    this.p = 1
    console.log(this.currentFollowingUser)
    const dataEvent = event.target.value

    this.recipesFollowingsUser = []

    if (event.target.checked == true) {
      this.dataEventCategories.push(dataEvent)
    } else {
      var index = this.dataEventCategories.indexOf(dataEvent)
      this.dataEventCategories.splice(index, 1)
    }

    if (this.dataEventCategories.length == 0) {
      this.getUserFollowing = []
      this.getFollowingCurrentUser(this.user.id)
    } else {
      const objectcat = {
        'category__in': this.dataEventCategories,
        'user__in': this.getUserFollowing
      }
      this.userService.getUserRecipesFollowing_by_category(objectcat).subscribe(data => {
        this.recipesFollowingsUser = data
        console.log(data)
      })
    }
  }

  addFavRecipe(userid: number, recipeid: number) {
    this.addfavRecipe = new FavoriteRecipe()
    this.addfavRecipe.user = userid
    this.addfavRecipe.recipe = recipeid
    this.favoriteRecipeService.createFavoriteRecipe(this.addfavRecipe).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  getFollowingCurrentUser(currentuserid: any) {
    console.log(currentuserid)
    this.getUserFollowing.push(currentuserid)
    this.userService.getFollowingUser(currentuserid).subscribe(data => {
      this.currentFollowingUser = data
      console.log(this.currentFollowingUser)

      if (this.currentFollowingUser.length == 0) {
        this.currentFollowingUser = [{'user_follower': currentuserid.toString(), 'user_following': '0'}]
      }
      console.log(this.currentFollowingUser)
      this.userService.getUserFollowingRecipes(this.currentFollowingUser).subscribe(data => {
        this.recipesFollowingsUser = data
        console.log(data)
      })

      for (let data of this.currentFollowingUser) {
        this.getUserFollowing.push(data.user_following[0])
      }

      this.userService.userFollowingsData.next(this.getUserFollowing)
    })

  }
}