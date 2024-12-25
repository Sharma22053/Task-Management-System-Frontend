import { Component, OnInit } from "@angular/core";
import { TaskCategoryService } from "./taskcategory.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
 
@Component({
  selector: 'app-taskcategory',
  templateUrl: './taskcategory.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TaskCategoryService],
})
export class TaskCategoryComponent implements OnInit {
  taskCategory: any = { taskId: 0, categoryIds: [] };
  taskId: number = 0;
  categoryId: number = 0;
  categoryList: any[] = [];
  taskList: any[] = [];
  loading: boolean = false;
  activeSection: string = '';
  isSidebarCollapsed: boolean = false;
  errorMessage: string | null = null;
  selectedAction: string = '';
 
  constructor(private taskCategoryService: TaskCategoryService) {}
 
  ngOnInit(): void {}
 
  // Toggle sidebar collapse
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  // Set selected action based on button clicked in the sidebar
  selectAction(action: string): void {
    this.selectedAction = action;
    this.errorMessage = null;  // Reset any previous errors
    this.clearTables();  // Clear any existing tables before switching actions
    console.log(`Selected action: ${this.selectedAction}`);
  }
 
  // Associate task with categories
  associateTaskWithCategories() {
    if (this.taskCategory.taskId && this.taskCategory.categoryIds.length) {
      this.loading = true;
 
      const taskCategoryRequest = {
        id: {
          taskId: this.taskCategory.taskId,
          categoryId: this.taskCategory.categoryIds[0],
        },
        task: {
          taskId: this.taskCategory.taskId,
        },
        category: {
          categoryId: this.taskCategory.categoryIds[0],
        }
      };
 
      this.taskCategoryService.associateTaskWithCategories(taskCategoryRequest).subscribe(
        (response) => {
          console.log("Task associated with categories:", response);
          this.clearForm();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error("Error associating task with categories:", error);
          this.errorMessage = "Error associating task with categories. Please try again.";
        }
      );
    } else {
      this.errorMessage = "Please provide a valid task ID and categories.";
    }
  }
 
  // Get categories for a specific task
  getCategoriesForTask() {
    if (this.taskId > 0) {
      this.loading = true;
 
      this.taskCategoryService.getCategoriesByTaskId(this.taskId).subscribe(
        (data) => {
          this.categoryList = data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error("Error fetching categories for task:", error);
          this.errorMessage = "Error fetching categories. Please try again.";
        }
      );
    } else {
      this.errorMessage = "Please enter a valid task ID.";
    }
  }
 
  // Get tasks for a specific category
  getTasksForCategory() {
    if (this.categoryId > 0) {
      this.loading = true;
 
      this.taskCategoryService.getTasksByCategoryId(this.categoryId).subscribe(
        (data) => {
          this.taskList = data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error("Error fetching tasks for category:", error);
          this.errorMessage = "Error fetching tasks. Please try again.";
        }
      );
    } else {
      this.errorMessage = "Please enter a valid category ID.";
    }
  }
 
  // Clear form after operation
  private clearForm() {
    this.taskCategory = { taskId: 0, categoryIds: [] };
    this.taskId = 0;
    this.categoryId = 0;
    this.clearTables();  // Clear tables after form submission
  }
 
  // Clear the displayed tables (category and task tables)
  private clearTables() {
    this.categoryList = [];
    this.taskList = [];
  }
}
 
 