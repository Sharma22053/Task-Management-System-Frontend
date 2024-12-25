 import { Component } from '@angular/core';
import { UserRoleService } from './userrole.service';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
 
@Component({
  selector: 'userrole-crud',
  templateUrl: './userrole.component.html',
  imports: [CommonModule, FormsModule]
})
export class UserRoleComponent {
  userRole: any = { userRoleId: 0, roleName: '' };
  userRoleList: any[] = [];
  loading: boolean = false;
  loadingMessage: string = '';
  currentAction: string = '';
  isSidebarCollapsed: boolean = false;
  errorMessage: string = '';
  message: string = '';
  fetchedRole: any;
 
  constructor(private userRoleService: UserRoleService) {}
 
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  clearForm(): void {
    this.userRole = { userRoleId: 0, roleName: '' };
    this.fetchedRole = null;
    this.errorMessage = '';
    this.message = '';  // Clear the message as well
  }
 
  // Create New User Role
  createNewUserRole(): void {
    if (this.userRole.userRoleId && this.userRole.roleName) {
      this.loading = true;
      this.loadingMessage = 'Creating user role...';
      this.userRoleService.createUserRole(this.userRole).subscribe(
        (response) => {
          console.log('User Role created:', response);
          this.clearForm();  // Clear the form after success
          this.getAllUserRoles(); // Refresh the list of roles after creation
          this.loading = false;
          this.message = 'User role created successfully!';  // Success message for Create
        },
        (error) => {
          console.error('Error creating user role:', error);
          this.errorMessage = `Error: ${error.message || error}`;
          this.loading = false;
        }
      );
    } else {
      alert('Please provide both User Role ID and Role Name.');
    }
  }
 
  // Update User Role Details
  updateUserRoleDetails(): void {
    if (this.userRole.userRoleId && this.userRole.roleName) {
      this.loading = true;
      this.loadingMessage = 'Updating user role...';
      this.userRoleService.updateUserRole(this.userRole).subscribe(
        (response) => {
          console.log('User Role updated:', response);
          this.clearForm();  // Clear the form after success
          this.getAllUserRoles(); // Refresh the list of roles after update
          this.loading = false;
          this.message = 'User role updated successfully!';  // Success message for Update
        },
        (error) => {
          console.error('Error updating user role:', error);
          alert(`Error: ${error.message || error}`);
          this.loading = false;
        }
      );
    } else {
      alert('Invalid User Role ID or Role Name.');
    }
  }
 
 
  // Delete User Role by ID
  deleteUserRoleById(userRoleId: number): void {
    this.message = '';  // Clear any previous success message
    if (userRoleId > 0) {
      this.loading = true;
      this.loadingMessage = 'Deleting user role...';
      this.userRoleService.deleteUserRole(userRoleId).subscribe(
        (response) => {
          console.log('User Role deleted:', response);
          this.getAllUserRoles(); // Refresh the list of roles after deletion
          this.loading = false;
          this.clearForm();
          this.message = 'User role deleted successfully!';  // Success message for Delete
        },
        (error) => {
          console.error('Error deleting user role:', error);
          alert(`Error: ${error.message || error}`);
          this.loading = false;
        }
      );
    } else {
      alert('Please enter a valid User Role ID.');
    }
  }
 
 
  // Fetch all user roles
  getAllUserRoles(): void {
    this.message = '';
    this.loading = true;
    this.loadingMessage = 'Fetching all user roles...';
    this.userRoleService.getAllUserRoles().subscribe(
      (data) => {
        this.userRoleList = data; // Update the list of roles
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching all user roles:', error);
        alert(`Error: ${error.message || error}`);
        this.loading = false;
      }
    );
  }
 
  // Fetch user role by ID
  getUserRoleById(): void {
    this.message = '';  // Clear any previous success message
    if (this.userRole.userRoleId) {
      this.loading = true;
      this.loadingMessage = 'Fetching user role...';
      this.userRoleService.getUserRoleById(this.userRole.userRoleId).subscribe(
        (response) => {
          console.log('User Role fetched by ID:', response);
          if (response) {
            this.fetchedRole = response; // Store the fetched role
            this.message = 'User role fetched successfully!';  // Success message for Get
          } else {
            this.errorMessage = 'No user role found for the given ID.';
            this.fetchedRole = null; // Reset the fetched role in case of no result
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching user role by ID:', error);
          this.errorMessage = `Error: ${error.message || error}`;
          this.loading = false;
        }
      );
    } else {
      alert('Please provide a valid UserRoleId.');
    }
  }
 
 
  // Show the appropriate form based on the action selected
  showForm(action: string): void {
    this.currentAction = action;
    this.errorMessage = ''; // Clear any existing error message
    if (action === 'getAll') {
      this.getAllUserRoles(); // Fetch roles when 'getAll' is selected
    } else if (action === 'getById') {
      this.getUserRoleById(); // Fetch role by ID when 'getById' is selected
    } else if (action === 'delete') {
      this.clearForm(); // Clear form for delete action
    } else {
      this.clearForm(); // Clear form for create/update actions
    }
  }
}
 
 