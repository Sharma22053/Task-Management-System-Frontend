import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
 
@Injectable({
    providedIn:'root'
})
 
export class CommentService{
 
    private static url:string = "http://localhost:8091/api/comments";
    constructor(private httpclient:HttpClient){}
 
    public createNewComment(comment:any) :Observable<any>{
        return this.httpclient.post(CommentService.url + "/post",comment);
    }
 
    public getListOfComments() :Observable<any[]>{
        return this.httpclient.get<any[]>(CommentService.url + "/all");
    }
 
    public getCommentByCommentId(commentId:number) :Observable<any>{
 
        return this.httpclient.get(CommentService.url + "/"+commentId);
    }
 
    public updateCommentDetails(comment:any): Observable<any>{
 
        return this.httpclient.post(CommentService.url + "/update/"+comment.commentId,comment);
    }
 
    public deleteComment(commentId:number):Observable<any>{
        return this.httpclient.delete(CommentService.url + "/delete/"+commentId);
    }
}
 