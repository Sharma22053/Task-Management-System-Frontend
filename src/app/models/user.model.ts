import { Project } from "./project.model";
import { Task } from "./task.model";
import { UserRole } from "./userrole.model";

  export interface UserProjection {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    password: string;
  }

  export interface User {
    userId: number;
    username: string;
    password: string;
    email: string;
    fullName: string;
    task?: Task[]; 
    notification?: Notification[]; 
    project?: Project[]; 
    comment?: Comment[]; 
    roles?: UserRole[]; 
  }
  