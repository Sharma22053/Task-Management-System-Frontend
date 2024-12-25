import { Task } from "./task.model";

export interface Project {
    projectId: number;
    projectName: string;
    description: string;
    startDate: string; 
    endDate: string; 
    user: { userId: number }; 
  }
  

  export interface ProjectProjection {
    projectId: number;
    projectName: string;
    description: string;
    startDate: string; 
    endDate: string;
  }
  