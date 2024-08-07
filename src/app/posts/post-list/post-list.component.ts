import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls : ['./post-list-component.css']
})


export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  private postSub: Subscription | undefined;


  constructor(public postsService: PostService) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) =>{
      this.isLoading = false;
      this.posts = posts;
    } );
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
  }

}
