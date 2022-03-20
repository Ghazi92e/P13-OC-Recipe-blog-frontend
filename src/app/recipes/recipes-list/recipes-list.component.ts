import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { Users } from '../../_models/Users.model';
import { FavoriteRecipe } from 'src/app/_models/FavoriteRecipe.model';
import { FavoriteRecipesService } from 'src/app/_services/favorite-recipes.service';
import { CategoryService } from 'src/app/_services/category.service';
import { Category } from 'src/app/_models/Category.model';
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

  recipesFollowingsUser: any[] = []

  constructor(private userService: UsersService, private router: Router, private favoriteRecipeService: FavoriteRecipesService, private categoryService: CategoryService) {
    this.user = { id: 0, username: '', password: '', email: '', file: 0, image_url: '', is_superuser: false }
    this.addfavRecipe = { id: 0, user: 0, recipe: 0 }
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    
    console.log(this.currentuser)
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
    const dataEvent = event.target.value

    this.recipesFollowingsUser = []

    if (event.target.checked == true) {
      this.dataEventCategories.push(dataEvent)
    } else {
      var index = this.dataEventCategories.indexOf(dataEvent)
      this.dataEventCategories.splice(index, 1)
    }

    if (this.dataEventCategories.length == 0) {
      this.getFollowingCurrentUser(this.user.id)
    } else {
      const objectcat = {
        'category__in': this.dataEventCategories,
      }
      this.userService.getUserRecipesFollowing_by_category(this.user.id, objectcat).subscribe(data => {
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
    this.userService.getUserFollowingRecipes(currentuserid).subscribe(data => {
      this.recipesFollowingsUser = data
      console.log(data)
    })
  }
}