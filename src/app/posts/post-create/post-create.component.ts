import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {


  constructor(public _postService: PostService) { }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._postService.addPosts(form.value.title, form.value.content);
    form.resetForm();
  }
}
