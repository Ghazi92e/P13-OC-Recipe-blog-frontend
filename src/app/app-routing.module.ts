import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SingleRecipeComponent } from './recipes/single-recipe/single-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { FavoriteRecipesComponent } from './users/favorite-recipes/favorite-recipes.component';

const routes: Routes = [
  { path: '', component: RecipesListComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'recipes', component: RecipesListComponent },
  { path: 'create-recipe', component: CreateRecipeComponent },
  { path: 'recipe/view/:id', component: SingleRecipeComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'recipe/edit/:id', component: EditRecipeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'favoriterecipes', component: FavoriteRecipesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
