import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './_services/users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { SingleRecipeComponent } from './recipes/single-recipe/single-recipe.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { CategoryService } from './_services/category.service';
import { RecipesService } from './_services/recipes.service';
import { FooterComponent } from './footer/footer.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { AllCommentsComponent } from './comment/all-comments/all-comments.component';
import { CommentService } from './_services/comment.service';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { UploadfileService } from './_services/uploadfile.service';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { FavoriteRecipesComponent } from './users/favorite-recipes/favorite-recipes.component';
import { FavoriteRecipesService } from './_services/favorite-recipes.service';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserRecipesComponent } from './users/user-recipes/user-recipes.component';
import { SearchBarRecipesComponent } from './search-bar-recipes/search-bar-recipes.component';
import { EditDashboardComponent } from './authentication/edit-dashboard/edit-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    CreateRecipeComponent,
    SingleRecipeComponent,
    CreateCategoryComponent,
    FooterComponent,
    CreateCommentComponent,
    AllCommentsComponent,
    EditRecipeComponent,
    DashboardComponent,
    FavoriteRecipesComponent,
    UsersListComponent,
    UserRecipesComponent,
    SearchBarRecipesComponent,
    EditDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RecipesService, UsersService, CategoryService, CommentService, UploadfileService, FavoriteRecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
