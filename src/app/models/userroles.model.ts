import { UserRole } from "./userrole.model";

export interface UserRoles{

    id:UserRoleId;
    userRolesId : UserRole;
}

export interface UserRoleId{
    
    userId:number;
    userRoleId:number;

}