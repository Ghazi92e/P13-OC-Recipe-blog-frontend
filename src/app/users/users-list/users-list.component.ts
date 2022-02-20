import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/_models/Users.model';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: Users[] = []

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(data => {
      this.users = data
    })
  }

  onViewUserRecipes(id: number) {
    this.router.navigate(['/user-recipe', id]);
  }

}
