import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommentService } from "./comment.service";
import { Comment,CommentProjection } from "../../models/comment.model";
 
@Component({
  selector: 'comment-crud',
  templateUrl: './comment.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CommentService]
})
export class CommentComponent {
  comment: any = {
    commentId: 0,
    text: "",
    createdAt: "",
    user: { userId: null },
    task: { taskId: null },
  };
  commentList: CommentProjection[] = [];
  currentAction: string | null = null;
  isSubmitted = false;
  
  // New properties
  isSidebarCollapsed: boolean = false; // Toggle state for sidebar
  message: string | null = null; // For success messages
  errorMessage: string | null = null; // For error messages
 
  constructor(private commentService: CommentService) { }
 
  // Toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  public createNewComment() {
    if (!this.comment.user.userId || !this.comment.task.taskId) {
      console.error("User ID and Task ID are required.");
      return;
    }
    this.commentService.createNewComment(this.comment).subscribe(() => {
      this.message = "Comment Created Successfully";
      this.clearForm();
    });
  }
 
  public getListOfComments() {
    this.commentService.getListOfComments().subscribe(
      data => {
        this.commentList = data;
        this.message = "Comments loaded successfully."; // Success message
      },
      error => {
        console.error('Error fetching comments:', error);
        this.errorMessage = "Failed to load comments."; // Error message
      }
    );
    this.clearForm();
  }
 
  public getCommentByCommentId() {
    this.isSubmitted = true;
    
    if (this.comment.commentId == null || this.comment.commentId === 0) {
      console.error("Comment ID is required.");
      return;
    }
    this.commentService.getCommentByCommentId(this.comment.commentId).subscribe(
      data => {
        if (data) {
          this.comment = data; // Bind the response to the component's comment variable
          console.log("Comment fetched:", this.comment);
          this.message = "Comment loaded successfully."; // Show success message
        } else {
          console.log("No comment found with ID", this.comment.commentId);
          this.clearForm();
          this.errorMessage = "No comment found."; // Show error message
        }
      },
      error => {
        console.error('Error fetching comment:', error);
        this.errorMessage = "Failed to fetch comment."; // Error message
      }
    );
  }
 
 
  public updateCommentDetails() {
    this.commentService.updateCommentDetails(this.comment).subscribe(
      () => {
        this.message = "Comment updated successfully."; // Success message
      },
      error => {
        this.errorMessage = "Failed to update comment."; // Error message
      }
    );
  }
 
  public deleteComment() {
    this.commentService.deleteComment(this.comment.commentId).subscribe(
      () => {
        this.message = "Comment deleted successfully."; // Success message
      },
      error => {
        this.errorMessage = "Failed to delete comment."; // Error message
      }
    );
  }
 
  clearForm() {
    this.comment = {
      commentId: 0,
      text: "",
      createdAt: "",
      user: { userId: null },
      task: { taskId: null },
    };
  }
 
  setAction(action: string) {
    this.currentAction = action;
    this.clearForm();
  }
 
  // Determine which fields to show based on the action
  showField(field: string): boolean {
    if (!this.currentAction) {
      return false;
    }
 
    const fieldsForActions: Record<string, string[]> = {
      create: ["commentId", "text", "createdAt", "userId", "taskId"],
      update: ["commentId", "text", "createdAt", "userId", "taskId"],
      getById: ["commentId"],
      delete: ["commentId"],
    };
 
    return fieldsForActions[this.currentAction]?.includes(field) ?? false;
  }
 
  // Handle form submission based on the current action
  handleAction() {
    switch (this.currentAction) {
      case "create":
        this.createNewComment();
        break;
      case "update":
        this.updateCommentDetails();
        break;
      case "getById":
        this.getCommentByCommentId();
        break;
      case "delete":
        this.deleteComment();
        break;
    }
    this.clearForm();
    this.currentAction = null;
  }
}
 
 
 
 