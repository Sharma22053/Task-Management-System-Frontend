// Combined Comment interface with simplified references to User and Task (userId, taskId)
export interface Comment {
    commentId: number;
    text: string;
    createdAt: string; // Represented as string for date handling
    user: { userId: number };  // Simplified reference to User (userId only)
    task: { taskId: number };  // Simplified reference to Task (taskId only)
  }
  
  // Projection Interface
  export interface CommentProjection {
    commentId: number;
    text: string;
    createdAt: string;  // Use string for dates in Angular
    userId: number;
    taskId: number;
  }
  