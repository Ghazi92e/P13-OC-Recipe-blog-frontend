import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[] = []
  currentuser: any
  datauser = []
  user: Users
  allUsers: Users[] = []
  allCategories: Category[] = []
  allFileUpload: FileUpload[] = []
  favRecipes: FavoriteRecipe[] = []
  addfavRecipe: FavoriteRecipe

  dataEventCategories: number[] = []

  constructor(private recipesService: RecipesService, private userService: UsersService, private router: Router, private uploadFileService: UploadfileService, private favoriteRecipeService: FavoriteRecipesService, private categoryService: CategoryService) {
    this.user = { id: 0, username: '', password: '', email: '', file: 0 }
    this.addfavRecipe = { id: 0, user: 0, recipe: 0 }
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');

    this.recipesService.getAllRecipes().subscribe(data => {
      this.recipes = data
    })
  
    this.uploadFileService.getFile().subscribe(data => {
      this.allFileUpload = data
      console.log(this.allFileUpload)
    })

    this.currentuser = localStorage.getItem('token');
    if (this.currentuser == null) {
      console.log("je suis deco")
      this.router.navigate(['sign-in'])
    } else {
      console.log("je suis co")
    }

    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      console.log(this.user)
    })

    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = data
      console.log(this.allUsers)
    })

    this.favoriteRecipeService.getAllFavoriteRecipes().subscribe(data => {
      this.favRecipes = data
      console.log(this.favRecipes)
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
    const dataEvent = event.target.value

    this.recipes = []

    if (event.target.checked == true) {
      this.dataEventCategories.push(dataEvent)
    } else {
      var index = this.dataEventCategories.indexOf(dataEvent)
      this.dataEventCategories.splice(index, 1)
    }

    if (this.dataEventCategories.length == 0) {
      this.recipesService.getAllRecipes().subscribe(data => {
        this.recipes = data
      })
    } else {
      for (let dataIdCategory of this.dataEventCategories) {
        console.log(dataIdCategory)
        this.recipesService.findRecipeByCategory(dataIdCategory).subscribe(data => {
          console.log(data)
          this.recipes = this.recipes.concat(data)
        }, error => {
          console.log(error)
        })
      }
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
}
