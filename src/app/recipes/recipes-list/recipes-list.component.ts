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
  allFileUpload: FileUpload[] = []
  favRecipes: FavoriteRecipe[] = []
  addfavRecipe: FavoriteRecipe

  constructor(private recipesService: RecipesService, private userService: UsersService, private router: Router, private uploadFileService: UploadfileService, private favoriteRecipeService: FavoriteRecipesService) {
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
  }

  onViewRecipe(id: number) {
    this.router.navigate(['/recipe', 'view', id]);
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
