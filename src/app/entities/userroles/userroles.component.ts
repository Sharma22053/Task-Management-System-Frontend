import { Component, OnInit } from '@angular/core';
import { UserRolesService } from './userroles.service';
import { UserRoles } from '../../models/userroles.model';
import { UserRoleProjection } from '../../models/userrole.model';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
 
@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserRolesService]
})
export class UserRolesComponent implements OnInit {
  userRoles: UserRoleProjection[] = []; // For listing user roles
  newUserRole: UserRoles = {
    id: {
      userId: 0,
      userRoleId: 0,  // ID of the user role
    },
    userRolesId: {
      userRoleId: 0,  // ID of the role
      roleName: '',    // Name of the role
    },
  };
 
  successMessage = ''; // Used for displaying success messages
  errorMessage = ''; // Used for displaying error messages
  userIdForRoles = 0; // For "Get User Roles by User ID"
  revokeUserRoleId = 0; // For "Revoke User Role"
  revokeUserId = 0; // For "Revoke User Role"
 
  isAssignFormVisible = false;
  isGetUserRolesFormVisible = false;
  isRevokeFormVisible = false;
  isSidebarCollapsed = false;  // Add sidebar collapse functionality
 
  constructor(private userRolesService: UserRolesService) {}
 
  ngOnInit(): void {
    // Initialize the user roles when the component is loaded
  }
 
  // Toggle sidebar collapse
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  // Fetch all user roles
  fetchAllUserRoles(): void {
    this.successMessage = '';
    this.resetForms();
    this.userRolesService.getAllUserRoles().subscribe({
      next: (data) => {
        this.userRoles = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load user roles.';
      },
    });
  }
 
  // Assign a new user role
  assignUserRole(): void {
    this.successMessage = '';
    this.userRolesService.assignUserRole(this.newUserRole).subscribe({
      next: (response) => {
        this.successMessage = 'User role assigned successfully.';
        this.errorMessage = '';
        
      },
      error: (err) => {
        this.errorMessage = 'Failed to assign user role.';
        this.successMessage = '';
      },
    });
  }
 
  // // Revoke a user role
  // revokeUserRole(revokeUserId:number,revokeUserRoleId:number): void {
  //   this.successMessage = '';
  //   this.userRolesService.revokeUserRole(revokeUserId,revokeUserRoleId).subscribe({
  //     next: (response) => {
  //       this.successMessage = 'User role revoked successfully.';
  //       this.errorMessage = '';
          
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Failed to revoke user role.';
  //       this.successMessage = '';
  //     },
  //   });
  // }
 
  // Revoke a user role
  revokeUserRole(userRoleId: number, userId: number): void {
    this.userRolesService.revokeUserRole(userRoleId, userId).subscribe({
      next: (response) => {
        this.successMessage = "UserRole revoked successfully";
        
      },
      error: (err) => (this.errorMessage = 'Failed to revoke user role.'),
    });
  }


  // Get user roles by User ID
  getUserRolesByUserId(): void {
    this.successMessage = '';
    if (!this.userIdForRoles) {
      this.errorMessage = 'Please provide a valid User ID.';
      return;
    }
 
    this.userRolesService.getUserRolesByUserId(this.userIdForRoles).subscribe({
      next: (data) => {
        this.userRoles = data;
        this.successMessage = `User roles fetched successfully for User ID: ${this.userIdForRoles}`;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch user roles.';
        this.successMessage = '';
      },
    });
  }
 
  // Show the Assign User Role form
  showAssignForm(): void {
    this.successMessage = '';
    this.resetForms();
    this.isAssignFormVisible = true;
  }
 
  // Show the Get User Roles by User ID form
  showGetUserRolesForm(): void {
    this.successMessage = '';
    this.resetForms();
    this.isGetUserRolesFormVisible = true;
  }
 
  // Show the Revoke User Role form
  showRevokeForm(): void {
    this.successMessage = '';
    this.resetForms();
    this.isRevokeFormVisible = true;
  }
 
  // Reset all form visibility flags
  resetForms(): void {
    this.isAssignFormVisible = false;
    this.isGetUserRolesFormVisible = false;
    this.isRevokeFormVisible = false;
  }
}
 
 