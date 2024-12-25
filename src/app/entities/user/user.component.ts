 import { Component } from "@angular/core";
import { UserService } from "./user.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { User, UserProjection } from "../../models/user.model";
 
@Component({
  selector: 'user-crud',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserService]
})
export class UserComponent {
  user: User = { userId: 0, username: "", password: "", email: "", fullName: "" };
  userList: UserProjection[] = [];
  isSidebarCollapsed: boolean = false;
  message: string = '';
  errorMessage: string = '';
  selectedAction: string = '';
 
  constructor(private userService: UserService) {}
 
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  public createNewUser() {
    this.userService.createNewUser(this.user).subscribe(
      () => {
        this.getListOfAllUsers();
        this.clearForm();
        this.message = "User created successfully!";
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error creating user:", error.message);
        this.errorMessage = "Failed to create user: " + error.message;
      }
    );
  }
 
  public getUserByUserId() {
    if (this.user.userId) {
      this.userService.getUserByUserId(this.user.userId).subscribe(
        (data) => {
          this.user = data;
          this.userList = [this.user];
          this.errorMessage = "";
        },
        (error) => {
          console.error("Error fetching user by ID:", error.message);
          this.errorMessage = "Failed to fetch user: " + error.message;
        }
      );
    } else {
      this.errorMessage = "Please provide a valid user ID.";
    }
  }
 
 
  public getUserByEmail() {
    this.userService.getUserByEmail(this.user.email).subscribe(
      (data) => {
        this.userList = [data];
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error fetching user by email:", error.message);
        this.errorMessage = "Failed to fetch user: " + error.message;
      }
    );
  }
 
  public getUserByName() {
    this.userService.getUserByName(this.user.username).subscribe(
      (data) => {
        this.userList = [data];
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error fetching user by name:", error.message);
        this.errorMessage = "Failed to fetch user: " + error.message;
      }
    );
  }
 
  public fetchUserWithMostTasks() {
    this.userService.getUsersWithMostTasks().subscribe(
      (data: UserProjection) => {
        this.userList = [data];
        this.message = "User with most tasks fetched successfully!";
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error fetching user with most tasks:", error.message);
        this.errorMessage = "Failed to fetch user with the most tasks: " + error.message;
      }
    );
  }
 
  public fetchUserWithCompletedTasks() {
    this.userService.getUsersWithCompletedTasks().subscribe(
      (data: UserProjection[]) => {
        this.userList = data;
        this.message = "Users with completed tasks fetched successfully!";
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error fetching users with completed tasks:", error.message);
        this.errorMessage = "Failed to fetch users with completed tasks: " + error.message;
      }
    );
  }
 
  public authenticateUser() {
    this.userService.authenticateUser(this.user.username, this.user.password).subscribe(
      (data: string) => {
        this.message = data;
        this.errorMessage = "";
      },
      (error) => {
        console.error("Authentication failed:", error.message);
        this.errorMessage = "Authentication failed: " + error.message;
      }
    );
  }
 
  public updateUserDetails() {
    this.userService.updateUserDetails(this.user).subscribe(
      () => {
        this.getListOfAllUsers();
        this.clearForm();
        this.message = "User updated successfully!";
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error updating user:", error.message);
        this.errorMessage = "Failed to update user: " + error.message;
      }
    );
  }
 
  public getListOfAllUsers() {
    this.userService.getListOfAllUsers().subscribe(
      (data) => {
        this.userList = data;
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error fetching users:", error.message);
        this.errorMessage = "Failed to fetch user list: " + error.message;
      }
    );
  }
 
  public deleteUser() {
    this.userService.deleteUser(this.user.userId).subscribe(
      () => {
        this.getListOfAllUsers();
        this.clearForm();
        this.message = "User deleted successfully!";
        this.errorMessage = "";
      },
      (error) => {
        console.error("Error deleting user:", error.message);
        this.errorMessage = "Failed to delete user: " + error.message;
      }
    );
  }
 
  clearForm() {
    this.user = { userId: 0, username: "", password: "", email: "", fullName: "" };
  }
 
  public selectAction(action: string) {
    this.selectedAction = action;
    this.clearForm();
    this.userList = [];
    this.message = '';
    this.errorMessage = '';
    if (['getUsersWithMostTasks', 'getUsersWithCompletedTasks', 'getAllUsers'].includes(action)) {
      this.onFormSubmit();
    }
 
    if (this.selectedAction === 'getUsersWithMostTasks') {
      this.fetchUserWithMostTasks();
    } else if (this.selectedAction === 'getUsersWithCompletedTasks') {
      this.fetchUserWithCompletedTasks();
    }
  }

 
  public isSubmitDisabled(): boolean {
    if (this.selectedAction === 'create' || this.selectedAction === 'update') {
      return !this.user.username || !this.user.password || !this.user.email || !this.user.fullName || (this.selectedAction === 'create' && !this.user.userId);
    }
    if (this.selectedAction === 'getById' || this.selectedAction === 'getByEmail' || this.selectedAction === 'getByName' || this.selectedAction === 'delete') {
      return !this.user.userId && !this.user.email && !this.user.username;
    }
    return false;
  }
 
  onFormSubmit() {
    switch (this.selectedAction) {
      case 'create': this.createNewUser(); break;
      case 'update': this.updateUserDetails(); break;
      case 'getByEmail': this.getUserByEmail(); break;
      case 'getById': this.getUserByUserId(); break;
      case 'getByName': this.getUserByName(); break;
      case 'delete': this.deleteUser(); break;
      case 'authenticate': this.authenticateUser(); break;
      case 'fetchMostTasks': this.fetchUserWithMostTasks(); break;
      case 'getUsersWithMostTasks': this.fetchUserWithMostTasks(); break;
      case 'getAllUsers': this.getListOfAllUsers(); break;
    }
  }
}
 
 