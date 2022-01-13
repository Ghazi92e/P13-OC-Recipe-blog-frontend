import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/_models/Fileupload.model';
import { Users } from 'src/app/_models/Users.model';
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

  recipe: Recipe
  currentuser: any
  user: Users[] = []
  id = this.route.snapshot.params['id'];
  fileupload: FileUpload

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router, private userService: UsersService, private uploadFileService: UploadfileService) 
  { this.recipe = {id: 0, title:'', description: '', category: 0, file: 0, user: 0}
    this.fileupload = { id: 0, file: ''} }

  ngOnInit(): void {
    this.recipesService.getSingleRecipe(this.id).subscribe(data => {
      this.recipe = data
      console.log(data)
      this.uploadFileService.getSingleFile(this.recipe.file).subscribe(data => {
        this.fileupload = data
        console.log("je suis le single file" + data)
      })
    })

    this.currentuser = localStorage.getItem('token');

    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data
      console.log(this.user[0])
    })

    console.log(this.recipe)
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

}
