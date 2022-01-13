import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/_models/Comment.model';
import { Users } from 'src/app/_models/Users.model';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  commentForm: FormGroup | any
  comment: Comment
  @Input() user: Users

  constructor(private formBuilder: FormBuilder, private commentService: CommentService) { this.comment = { id: 0, created:'', description:'', user: 0 }, this.user = { id: 0, username: '', password: '', email: '', file: 1 } }
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.commentForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
  }

  getComment() {
    const description = this.commentForm?.get('description')?.value;
    this.comment = new Comment()
    this.comment.description = description
    this.comment.user = this.user.id
    console.log(this.comment)

    this.commentService.createComment(this.comment).subscribe(data => {
      console.log(data)
      window.location.reload()
    },
    error => {
      console.log(error)
    })
  }

}
