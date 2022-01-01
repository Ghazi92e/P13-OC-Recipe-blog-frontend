import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/_models/Users.model';
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

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router, private userService: UsersService) { this.recipe = {id: 0, title:'', description: '', category: 0, file: '', user: 0} }

  ngOnInit(): void {
    this.recipesService.getSingleRecipe(this.route.snapshot.params.id).subscribe(data => {
      this.recipe = data
      console.log(data)
    })

    this.currentuser = localStorage.getItem('token');

    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data
      console.log(this.user[0])
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

}
