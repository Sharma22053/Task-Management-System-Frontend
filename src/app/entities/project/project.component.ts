import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project, ProjectProjection } from '../../models/project.model';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl:'./project.component.css',
  providers: [ProjectService]
})
export class ProjectComponent  {
  projectList: ProjectProjection[] = [];
  project: Project = { projectId: 0, projectName: '', description: '', startDate: '', endDate: '', user: { userId: 0 } };
  message: string = "";
  errorMessage: string = "";
  selectedAction: string = '';
  status: string = '';
  roleName: string = '';
  isSidebarCollapsed :boolean = false;
  
  constructor(private projectService: ProjectService) { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  
  // Select the action to perform
  selectAction(action: string): void {
    this.selectedAction = action;
    this.message = ''; // Clear message when changing action
    this.errorMessage = ''; // Clear error message
  }

  // Submit form for creating or updating the project
  onFormSubmit(): void {
    if (this.selectedAction === 'create') {
      this.createNewProject();
    } else if (this.selectedAction === 'update') {
      this.updateProjectDetails();
    }
  }

  // Check if the submit button should be disabled
  isSubmitDisabled(): boolean {
    return !this.project.projectId || !this.project.projectName || !this.project.description || 
           !this.project.startDate || !this.project.endDate || !this.project.user.userId;
  }

  // Create a new project
  createNewProject(): void {
    this.projectService.createNewProject(this.project).subscribe(response => {
      console.log('Project created:', response);
      this.message = "Project created successfully";
      this.clearForm();
    }, error => {
      this.errorMessage = "Error creating project";
    });
  }

  // Update project details
  updateProjectDetails(): void {
    const projectId = this.project.projectId;
    this.projectService.updateProjectDetails(projectId, this.project).subscribe(response => {
      console.log('Project updated:', response);
      this.message = "Project updated successfully";
      this.clearForm();
    }, error => {
      this.errorMessage = "Error updating project";
    });
  }

  // Get ongoing projects
  getOngoingProjects(): void {
    this.projectService.getOngoingProjects().subscribe(response => {
      this.projectList = response;
      this.message = "Ongoing projects retrieved successfully";
      this.clearForm();
      
    }, error => {
      this.errorMessage = "Error retrieving ongoing projects";
    });
  }

  // Get projects by date range
  getProjectsInDateRange(): void {
    if (!this.project.startDate || !this.project.endDate) {
      this.errorMessage = "Please provide both start and end dates.";
      return;
    }
    this.projectService.getProjectsInDateRange(this.project.startDate, this.project.endDate).subscribe(response => {
      this.projectList = response;
      this.message = "Projects in the specified date range retrieved successfully";
    }, error => {
      this.errorMessage = "Error retrieving projects by date range";
    });
  }

  // Get projects by status
  getProjectsByStatus(): void {
    if (!this.status) {
      this.errorMessage = "Please select a status.";
      return;
    }
    this.projectService.getProjectsByStatus(this.status).subscribe(response => {
      this.projectList = response;
      this.message = "Projects by status retrieved successfully";
    }, error => {
      this.errorMessage = "Error retrieving projects by status";
    });
  }

  // Get projects with high priority tasks
  getProjectsWithHighPriority(): void {
    this.projectService.getProjectsWithHighPriority().subscribe(response => {
      this.projectList = response;
      this.message = "Projects with high priority tasks retrieved successfully";
    }, error => {
      this.errorMessage = "Error retrieving high priority projects";
    });
  }

  // Get projects by user role
  getProjectsByUserRole(): void {
    if (!this.roleName) {
      this.errorMessage = "Please provide a role name.";
      return;
    }
    this.projectService.getProjectsByUserRole(this.roleName).subscribe(response => {
      this.projectList = response;
      this.message = "Projects by user role retrieved successfully";
    }, error => {
      this.errorMessage = "Error retrieving projects by user role";
    });
  }

  deleteProject(): void {
    if (!this.project.projectId) {
      this.errorMessage = "Please provide a project ID.";
      return;
    }
    this.projectService.deleteProjectById(this.project.projectId).subscribe(
      (response) => {
        console.log(response); // Log the response for debugging
        this.message = response; // Use the response message from the backend
        this.errorMessage = ''; // Clear any previous error messages
        this.clearForm();
      },
      (error) => {
        console.error(error); // Log the error for debugging
        this.errorMessage = "Error deleting project";
      }
    );
  }

  // Clear the form after success
  clearForm(): void {
    this.project = { projectId: 0, projectName: '', description: '', startDate: '', endDate: '', user: { userId: 0 } };
    this.status = '';
    this.roleName = '';
  }

}
