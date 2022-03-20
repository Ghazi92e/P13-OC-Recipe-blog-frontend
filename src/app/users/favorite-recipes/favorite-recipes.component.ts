import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteRecipe } from '../../_models/FavoriteRecipe.model';
import { FileUpload } from '../../_models/Fileupload.model';
import { Recipe } from '../../_models/Recipe.model';
import { Users } from '../../_models/Users.model';
import { FavoriteRecipesService } from '../../_services/favorite-recipes.service';
import { RecipesService } from '../../_services/recipes.service';
import { UploadfileService } from '../../_services/uploadfile.service';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.css']
})
export class FavoriteRecipesComponent implements OnInit {

  currentuser: any
  user: Users
  userFavoriteRecipes: any[] = []
  // allFileUpload: FileUpload[] = []
  FileRecipe: FileUpload[] = []
  p: number = 1;

  constructor(private favoriteRecipeService: FavoriteRecipesService, private userService: UsersService, private recipesService: RecipesService, private uploadFileService: UploadfileService, private router: Router) 
  { 
    this.user = { id: 0, username: '', password: '', email: '', file: 0 , image_url: '', is_superuser: false }
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      console.log(this.user.id)
      this.getUserFavoriteRecipe(this.user.id)
    })
  }

  getUserFavoriteRecipe(userid: any) {
    this.userService.getFavoriteRecipesUser(userid).subscribe(data => {
      console.log(data)
      this.userFavoriteRecipes = data
      console.log(this.userFavoriteRecipes)
    }, error => {
      console.log(error)
    })
  }

  getSingleFile(id: number) {
    this.uploadFileService.getSingleFile(id).subscribe(data => {
      this.FileRecipe.push(data)
    })
  }

  onViewRecipe(id: number) {
    this.router.navigate(['/recipe', 'view', id]);
  }

  deleteFavRecipe(currentUserId: any, index: any, favRecipeId:any) {
    const options = {
      body: {
        recipe: favRecipeId,
      }
    }
    this.userService.deleteFavoriterecipeUser(currentUserId, options).subscribe(data => {
      console.log(data)
      this.userFavoriteRecipes.splice(index, 1)
    }, error => {
      console.log(error)
    })
  }
}