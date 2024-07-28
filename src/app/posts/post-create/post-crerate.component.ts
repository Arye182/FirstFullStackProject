import { Component, EventEmitter, OnInit} from "@angular/core";
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit{
  enteredContent = '';
  enteredTitle = '';
   private mode = 'create';
   private postId : string | null = null;
   post : Post | undefined;

  constructor(public postsService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
            this.mode = 'edit';
            this.postId = paramMap.get('postId');
            this.post = this.postsService.getPost(this.postId);
        } else {
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onAddPost(form : NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create' ) {
      this.postsService.addPost(form.value.title,  form.value.content);

    } else {
      this.postsService.updatePost(this.postId!, form.value.title, form.value.content)
    }

    form.resetForm();
  }
}
