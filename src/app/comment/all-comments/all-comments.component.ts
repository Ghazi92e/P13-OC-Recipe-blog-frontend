import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/_models/Comment.model';
import { Users } from 'src/app/_models/Users.model';
import { CommentService } from 'src/app/_services/comment.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent implements OnInit {

  comments: Comment[] = []
  createdAt: string
  @Input() users: Users[] = []
  currentuser: any
  user: Users

  constructor(private commentService: CommentService, private userService: UsersService) { this.createdAt = '', this.user = { id: 0, username: '', password: '', email: '', file: 0, image_url: '', is_superuser: false } }

  ngOnInit(): void {
    this.commentService.getAllComment().subscribe(data => {
      this.comments = data
      console.log(this.comments)
    })

    this.currentuser = localStorage.getItem('token');
    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data[0]
      console.log(this.user)
    })
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(response => {
      console.log(response)
      window.location.reload()
      },
      error => {
        console.log(error)
    })
  }

}
