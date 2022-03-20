import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/_models/Recipe.model';
import { Relationships } from 'src/app/_models/Relationships.model';
import { Users } from 'src/app/_models/Users.model';
import { RecipesService } from 'src/app/_services/recipes.service';
import { UsersService } from 'src/app/_services/users.service';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {

  user: Users
  userid = this.route.snapshot.params['id'];
  userRecipes: Recipe[] = []
  recipesuserids: any

  userFollowing: any
  currentuser: Users
  currentUserToken: any

  relationships: Relationships
  p: number = 1;

  show = true

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { 
    this.user = { id: 0, username: '', email: '', password: '', file: 0, image_url: '' }, 
    this.currentuser = { id: 0, username: '', email: '', password: '', file: 0, image_url: '' },
    this.relationships = {id: 0, user_follower: [0], user_following: [0] } }

  ngOnInit(): void {
    this.currentUserToken = localStorage.getItem('token');
    this.usersService.getCurrentUser(this.currentUserToken).subscribe(data => {
      this.currentuser = data[0]
      console.log(this.currentuser)
      this.getCurrentUserFollowingUser(this.currentuser.id)
    })

    this.usersService.getRecipesUser(this.userid).subscribe(recipesUserids => {
      this.userRecipes = recipesUserids
      console.log(this.userRecipes)
    })

    this.usersService.getSingleUser(this.userid).subscribe(data => {
      console.log(data)
      this.user = data
    })
  }

  getCurrentUserFollowingUser(currentUserId: any) {
    this.usersService.getFollowingUser(currentUserId).subscribe(data => {
      this.userFollowing = data
      console.log(this.userFollowing)
      for (let userFoll of this.userFollowing) {
        console.log(this.currentuser.id)
        if (this.userid == userFoll.user_following[0]) {
          this.show = false
          console.log(currentUserId)
          console.log(userFoll.user_following[0])
        }
      }
    })
  }

  onViewRecipe(recipeId: number) {
    this.router.navigate(['/recipe', 'view', recipeId]);
  }

  followUser() {
    this.relationships = {
      id: 0,
      user_follower: [this.currentuser.id],
      user_following: [this.user.id]
    }
    this.usersService.createFollowingUser(this.currentuser.id, this.relationships).subscribe(data => {
      console.log(data)
      this.show = false
    }, error => {
      console.log(error)
    })
  }

  unsuscribeUser() {
    const options = {
      body: {
        user_follower: this.currentuser.id,
        user_following: this.userid
      }
    }
    console.log(this.currentuser.id)
    console.log(this.userid)
    this.usersService.deleteFollowingUser(this.currentuser.id, options).subscribe(data => {
      console.log(data)
      this.show = true
    }, error => {
      console.log(error)
    })
  }


}
