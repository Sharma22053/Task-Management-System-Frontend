
export interface UserRole {
    userRoleId: number;
    roleName: string;
    users?: { userId: number }[]; 
}
 

  export interface UserRoleProjection {
    userRoleId: number;
    roleName: string;
  }

  