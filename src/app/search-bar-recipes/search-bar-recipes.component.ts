import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../_models/Users.model';
import { RecipesService } from '../_services/recipes.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-search-bar-recipes',
  templateUrl: './search-bar-recipes.component.html',
  styleUrls: ['./search-bar-recipes.component.css']
})
export class SearchBarRecipesComponent implements OnInit {


  recipesFollowingsUserHeader: any[] = []
  datasearchbar: any

  datatest: any

  constructor(private userService: UsersService, private router: Router, private recipeService: RecipesService) { this.datasearchbar = {title: '', user__in: '' } }

  ngOnInit(): void {
    this.userService.userFollowingsData.subscribe(data => {
      this.datatest = data
      console.log(this.datatest)
    })

    this.recipeService.subject.subscribe(data => {
      this.datasearchbar = data
      this.userService.searchRecipesByUserFollowing(this.datasearchbar).subscribe(data => {
        this.recipesFollowingsUserHeader = data
        console.log(this.recipesFollowingsUserHeader)
      })
    })
  }

  onViewRecipe(id: number) {
    this.router.navigate(['/recipe', 'view', id]);
  }
}
