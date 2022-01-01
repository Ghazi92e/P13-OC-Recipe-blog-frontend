import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/_models/Comment.model';
import { Users } from 'src/app/_models/Users.model';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent implements OnInit {

  comments: Comment[] = []
  @Input() users: Users[] = []

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentService.getAllComment().subscribe(data => {
      this.comments = data
      console.log(this.comments)
    })
  }

}
