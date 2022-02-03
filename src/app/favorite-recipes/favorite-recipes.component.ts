import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteRecipe } from '../_models/FavoriteRecipe.model';
import { FileUpload } from '../_models/Fileupload.model';
import { Recipe } from '../_models/Recipe.model';
import { Users } from '../_models/Users.model';
import { FavoriteRecipesService } from '../_services/favorite-recipes.service';
import { RecipesService } from '../_services/recipes.service';
import { UploadfileService } from '../_services/uploadfile.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.css']
})
export class FavoriteRecipesComponent implements OnInit {

  currentuser: any
  user: Users
  recipes: Recipe[] = []
  // allFileUpload: FileUpload[] = []
  userFavoriteRecipes: any
  getUserRecipes: Users[] = []
  FileRecipe: FileUpload[] = []

  constructor(private favoriteRecipeService: FavoriteRecipesService, private userService: UsersService, private recipesService: RecipesService, private uploadFileService: UploadfileService, private router: Router) 
  { 
    this.user = { id: 0, username: '', password: '', email: '', file: 0 , image_url: ''}
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      console.log(this.user.id)
      this.getUserFavoriteRecipe(this.user.id)
    })

    // this.uploadFileService.getFile().subscribe(data => {
    //   this.allFileUpload = data
    //   console.log(this.allFileUpload)
    // })

    console.log(this.recipes)
    console.log(this.FileRecipe)
    console.log(this.getUserRecipes)

  }

  getUserFavoriteRecipe(userid: any) {
    this.userService.getFavoriteRecipesUser(userid).subscribe( data => {
      this.userFavoriteRecipes = data
      console.log(this.userFavoriteRecipes)
      console.log(this.userFavoriteRecipes.favorite_recipes)
      for (let favoriteRecipesUserId of this.userFavoriteRecipes.favorite_recipes) {
        this.getSingleRecipe(favoriteRecipesUserId)
      }
    }, error => {
      console.log(error)
    })
  }

  getSingleRecipe(id: number) {
    this.recipesService.getSingleRecipe(id).subscribe(dataSingleRecipe => {
      this.getSingleFile(dataSingleRecipe.file)
      this.userService.getSingleUser(dataSingleRecipe.user).subscribe(dataSingleUser => {
        if (dataSingleRecipe.user == dataSingleUser.id) {
          this.recipes.push(dataSingleRecipe)
          this.getUserRecipes.push(dataSingleUser)
        }
      })
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
      this.recipes.splice(index, 1)
    }, error => {
      console.log(error)
    })
  }
}
