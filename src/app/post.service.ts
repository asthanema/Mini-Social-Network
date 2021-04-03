import { Injectable } from '@angular/core';
import {Post} from './posts/post.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts:Post[]=[];
  private postsUpdated=new Subject<Post[]>();
  constructor(private http:HttpClient) { }

  getPosts(){
    this.http.get<{message:String, posts:any }>
    ('http://localhost:3000/api/posts')
    .pipe(map((postData=>{
     return postData.posts.map(post=>{
       return{
         title:post.title,
         content:post.content,
         id:post._id
       }
     })
    })))
    .subscribe((postData)=>{
     this.posts=postData.posts;
     this.postsUpdated.next([...this.posts]);
    });
  }

  getPostsUpdateListener(){
   return this.postsUpdated.asObservable();   //returns the Subject object as observable
                                              // which can be used to listen it
  }

  addPosts(title:String, content:String){
    const post:Post={id:null,title:title,content:content};
    this.http.post<{message:String}>('http://localhost:3000/api/posts',post)
    .subscribe(responseData=>{
      console.log(responseData.message);
      this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    })
 }
    
  

  
}
