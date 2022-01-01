import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentuser: any

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.currentuser = localStorage.getItem('token');
    if (this.currentuser == null) {
      console.log("je suis deco")
    } else {
      console.log("je suis co")
    }
  }

  signOut() {
    console.log("je suis dans signOut")
    localStorage.removeItem('token');
    this.router.navigate(['sign-in']).then(() => {
      window.location.reload()
    });
  }

}
