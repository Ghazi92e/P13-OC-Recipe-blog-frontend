import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { Recipe } from '../../_models/Recipe.model';
import { Users } from '../../_models/Users.model';
import { RecipesService } from '../../_services/recipes.service';
import { UploadfileService } from 'src/app/_services/uploadfile.service';
import { FileUpload } from 'src/app/_models/Fileupload.model';

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

  constructor(private recipesService: RecipesService, private userService: UsersService, private router: Router, private uploadFileService: UploadfileService) {
    this.user = { id: 0, username: '', password: '', email: '', file: 0}
  }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    this.recipesService.getAllRecipes().subscribe(data => {
      this.recipes = data
      // console.log(data)
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

  }

  onViewRecipe(id: number) {
    this.router.navigate(['/recipe', 'view', id]);
  }
}
