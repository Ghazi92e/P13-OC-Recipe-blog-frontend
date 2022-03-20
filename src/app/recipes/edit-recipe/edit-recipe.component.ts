import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/Recipe.model';
import { RecipesService } from 'src/app/_services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipe: Recipe;
  id = this.route.snapshot.params['id']

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) { this.recipe = { id: 0, title: '', description: '', file: 0, category: 0, user: 0, image_url: '', ingredients: '' } }

  ngOnInit() {
    this.recipeService.getSingleRecipe(this.id).subscribe(data => {
      this.recipe = data
      console.log(data)
    })
  }

}
