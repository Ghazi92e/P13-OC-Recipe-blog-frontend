import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteRecipe } from 'src/app/_models/FavoriteRecipe.model';
import { FileUpload } from 'src/app/_models/Fileupload.model';
import { Users } from 'src/app/_models/Users.model';
import { FavoriteRecipesService } from 'src/app/_services/favorite-recipes.service';
import { UploadfileService } from 'src/app/_services/uploadfile.service';
import { UsersService } from 'src/app/_services/users.service';
import { Recipe } from '../../_models/Recipe.model';
import { RecipesService } from '../../_services/recipes.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {

  @Input() recipe: Recipe
  currentuser: any
  user: Users[]
  id = this.route.snapshot.params['id'];
  fileupload: FileUpload
  addfavRecipe: FavoriteRecipe
  getUserFavRecipe: any[] = []

  show = false

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router, private userService: UsersService, private uploadFileService: UploadfileService, private favoriteRecipeService: FavoriteRecipesService) 
  { this.recipe = {id: 0, title:'', description: '', category: 0, file: 0, user: 0, image_url: '', ingredients: ''}
    this.fileupload = { id: 0, file: ''}
    this.addfavRecipe = {id: 0, user: 0, recipe: 0}
    this.user = [{id: 0, username:'', email:'', password:'', file: 0, image_url: '', is_superuser: false }]
  }

  ngOnInit(): void {
    this.recipesService.getSingleRecipe(this.id).subscribe(data => {
      this.recipe = data
      console.log(data)
    })

    this.currentuser = localStorage.getItem('token');

    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data
      console.log(this.user[0])
      this.getUserFavoriteRecipe(this.user[0].id)
    })
  }

  getUserFavoriteRecipe(currentUserid: any) {
    this.userService.getFavoriteRecipesUser(currentUserid).subscribe(data => {
      console.log(data)
      this.getUserFavRecipe = data
      console.log(this.getUserFavRecipe)
      for (let data of this.getUserFavRecipe) {
        console.log(data.recipe)
        if(data.recipe.id == this.id) {
          this.show = true
        }
      }
    })
  }

  deleteRecipe(id: any) {
    this.recipesService.deleteRecipe(id).subscribe(response => {
      console.log(response)
      this.router.navigate(['recipes'])
      },
      error => {
        console.log(error)
    })
  }

  editRecipe() {
    this.router.navigate(['/recipe', 'edit', this.id]);
  }

  addFavRecipe(userid: number, recipeid: number) {
    this.addfavRecipe = {
      id: 0,
      user: userid,
      recipe: recipeid
    }
    this.favoriteRecipeService.createFavoriteRecipe(this.addfavRecipe).subscribe(data => {
      console.log(data)
      this.show = true
    }, error => {
      console.log(error)
    })
  }
}