import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from '../_services/recipes.service';

@Component({
  selector: 'app-search-bar-recipes',
  templateUrl: './search-bar-recipes.component.html',
  styleUrls: ['./search-bar-recipes.component.css']
})
export class SearchBarRecipesComponent implements OnInit {


  recipesFollowingsUserHeader: any[] = []
  serachBar: Subscription | any
  p: number = 1;


  constructor(private router: Router, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.serachBar = this.recipeService.getDataSubjectRecipe.subscribe(data => {
      this.recipesFollowingsUserHeader = data
      console.log(this.recipesFollowingsUserHeader)
      this.p = 1
    })
  }

  onViewRecipe(id: number) {
    this.router.navigate(['/recipe', 'view', id]);
  }

  ngOnDestroy() {
    if(this.serachBar) this.serachBar.unsubscribe();
  }

}
