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
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserRecipesComponent } from './users/user-recipes/user-recipes.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarRecipesComponent } from './search-bar-recipes/search-bar-recipes.component';
import { HeaderComponent } from './header/header.component';
import { EditDashboardComponent } from './authentication/edit-dashboard/edit-dashboard.component';
import { UserTchatComponent } from './users/user-tchat/user-tchat.component';

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
  { path: 'favoriterecipes', component: FavoriteRecipesComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'user-recipe/:id', component: UserRecipesComponent },
  { path: 'search-recipe', component: SearchBarRecipesComponent },
  { path: 'edit-dashboard', component: EditDashboardComponent },
  { path: 'user-tchat/:id', component: UserTchatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
