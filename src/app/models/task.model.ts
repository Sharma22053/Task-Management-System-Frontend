import { Attachment } from "./attachment.model";
import { Category } from "./category.model";


export interface Task {
    taskId: number;
    taskName: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    project: { projectId: number };  
    user: { userId: number };  
    comment?: Comment[]; 
    categories?: Category[]; 
    attachment?: Attachment[]; 
  }
  
  // Projection Interface
  export interface TaskProjection {
    taskId: number;
    taskName: string;
    description: string;
    dueDate: string; // Use string for dates in Angular
    priority: string;
    status: string;
  }
  