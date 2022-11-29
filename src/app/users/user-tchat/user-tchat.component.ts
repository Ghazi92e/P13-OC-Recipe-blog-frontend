import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import { CreateUserMessage, Users } from 'src/app/_models/Users.model';

@Component({
  selector: 'app-user-tchat',
  templateUrl: './user-tchat.component.html',
  styleUrls: ['./user-tchat.component.css']
})
export class UserTchatComponent implements OnInit {
  currentuser: Users
  currentusertchat: Users
  createusermessage: CreateUserMessage
  listofuserstchat: number[]
  userTchat: any
  getusermessage: string = '';
  currentUserToken: any
  userid = this.route.snapshot.params['id'];

  @ViewChild("messageContainer") mContainer: ElementRef | any


  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService) {
    this.currentuser = { id: 0, username: '', email: '', password: '', file: 0, image_url: '', is_superuser: false}
    this.currentusertchat = { id: 0, username: '', email: '', password: '', file: 0, image_url: '', is_superuser: false}
    this.listofuserstchat = [],
    this.createusermessage = {id: 0, sender: 0, receiver: 0, message: ''},
    this.userTchat = []
  }

  ngOnInit(): void {
    this.currentUserToken = localStorage.getItem('token');
    this.usersService.getSingleUser(this.userid).subscribe(data => {
      this.currentusertchat = data
    })
    this.usersService.getCurrentUser(this.currentUserToken).subscribe(data => {
      this.currentuser = data[0]
      console.log(this.currentuser)
      console.log(this.currentuser.id)
      console.log(this.userid)
      this.listofuserstchat.push(this.userid, this.currentuser.id)
      console.log(this.listofuserstchat)


      this.usersService.getUserMessage(this.listofuserstchat).subscribe(datauser => {
        this.userTchat = datauser
        console.log(this.userTchat)
      })
    })
  }

  ngAfterViewChecked() {
    this.mContainer.nativeElement.scrollTop = this.mContainer.nativeElement.scrollHeight;
  }

  setValue() {
    this.createusermessage = {
      id: 0,
      sender: this.currentuser.id,
      receiver: this.currentusertchat.id,
      message: this.getusermessage
    }
    this.usersService.createUserMessage(this.createusermessage).subscribe(data => {
      this.userTchat.push(data)
      this.getusermessage = ''
    }, error => {
      console.log(error)
    })
  }

}
