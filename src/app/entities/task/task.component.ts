import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task, TaskProjection } from '../../models/task.model';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  tasks: TaskProjection[] = [];
  task: Task = {
    taskId: 0,
    taskName: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
    project: { projectId: 0 },
    user: { userId: 0 },
  };
  message: string = '';
  selectedAction: string = '';
  taskIdToDelete: number = 0;
 
  status: string = '';
  priority: string = '';
  isSidebarCollapsed: boolean = false;
  userId: number = 0;
  categoryId: number = 0;
 
  priorityOptions: string[] = ['High', 'Medium', 'Low'];
  statusOptions: string[] = ['New', 'In Progress', 'Completed'];
 
  noDueTasks: boolean = false;
 
  constructor(private taskService: TaskService) {}
 
  ngOnInit(): void {}
 
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  // getTasksDueSoon(): void {
  //   this.clearMessage();
  //   this.taskService.getTasksDueSoon().subscribe(
  //     (tasks) => {
  //       this.tasks = tasks;
  //       if (this.tasks.length === 0) {
  //         this.noDueTasks = true;
  //       }
  //     },
  //     (error) => {
  //       this.message = `Error fetching tasks due soon: ${error.message}`;
  //     }
  //   );
  // }
 
  closeNoDueTasksPopup(): void {
    this.noDueTasks = false;
  }
 
  // getOverdueTasks(): void {
  //   this.clearMessage();
  //   this.taskService.getOverdueTasks().subscribe(
  //     (tasks) => this.tasks = tasks,
  //     (error) => this.message = `Error fetching overdue tasks: ${error.message}`
  //   );
  // }
 

  getTasksDueSoon(): void {
    this.taskService.getTasksDueSoon().subscribe(
      (data) => {
        this.tasks = data;
        if (this.tasks.length === 0) {
          this.noDueTasks = true; // Set flag if no tasks are found
        }
      },
      (error) => {
        console.error('Error fetching due soon tasks:', error);
      }
    );
  }
  
  getOverdueTasks(): void {
    this.taskService.getOverdueTasks().subscribe(
      (data) => {
        this.tasks = data;
        if (this.tasks.length === 0) {
          this.noDueTasks = true; // Set flag if no overdue tasks are found
        }
      },
      (error) => {
        this.message = 'No Tasks are due soon';
      }
    );
  }
  getTasksByPriorityAndStatus(): void {
    if (this.priority && this.status) {
      this.clearMessage();
      this.taskService.getTasksByPriorityAndStatus(this.priority, this.status).subscribe(
        (tasks) => {
          if (tasks.length === 0) {
            this.message = `No tasks found for Priority: ${this.priority} and Status: ${this.status}`;
          } else {
            this.tasks = tasks;
          }
        },
        (error) => {
          this.message = `Error fetching tasks: ${error.message}`;
        }
      );
    } else {
      this.message = 'Please select both priority and status.';
    }
  }
 
  

  createTask(): void {
    this.taskService.createTask(this.task).subscribe(
      (response) => (this.message = 'Task created successfully!'),
      (error) => console.error(error)
    );
  }
 
  // updateTask(taskId: number): void {
  //   if (taskId > 0) {
  //     this.clearMessage();  // Clear any previous messages
  //     this.taskService.updateTask(taskId, this.task).subscribe(
  //       (response) => {
  //         this.message = 'Task updated successfully!'; // Success message
  //         this.clearTask();  // Optionally clear the task form after update
  //       },
  //       (error) => {
  //         this.message = `Error updating task: ${error.message}`;
  //       }
  //     );
  //   } else {
  //     this.message = 'Please provide a valid task ID for update.';
  //   }
  // }

  updateTask(taskId: number): void {
    this.taskService.updateTask(taskId, this.task).subscribe(
      (response) => (this.message = 'Task updated successfully!'),
      (error) => console.error(error)
    );
  }
 
 
  deleteTask(): void {
    if (this.taskIdToDelete > 0) {
      console.log('Deleting task with ID:', this.taskIdToDelete);
      this.taskService.deleteTask(this.taskIdToDelete).subscribe({
        next: () => {
          this.loadTasks();
          alert('Task deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          alert('Failed to delete the task');
        }
      });
    } else {
      alert('Please select a valid task to delete');
    }
  }
 
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        alert('Failed to load tasks');
      }
    });
  }
 
  // getTasksByUserIdAndStatus(): void {
  //   if (this.userId && this.status) {
  //     this.clearMessage();
  //     this.taskService.getTasksByUserIdAndStatus(this.userId, this.status).subscribe(
  //       (tasks) => {
  //         if (tasks.length === 0) {
  //           this.message = `No tasks found for User ID: ${this.userId} and Status: ${this.status}`;
  //         } else {
  //           this.tasks = tasks;
  //         }
  //       },
  //       (error) => {
  //         this.message = `Error fetching tasks: ${error.message}`;
  //       }
  //     );
  //   } else {
  //     this.message = 'Please provide both user ID and status.';
  //   }
  // }


  getTasksByUserIdAndStatus(): void {
    this.taskService.getTasksByUserIdAndStatus(this.userId, this.status).subscribe(
        (tasks) => {
            this.tasks = tasks;
            this.clearTask();
            this.clearForm();
        },
        (error) => console.error(error)
    );
}

  clearForm(){
    this.task = {
      taskId: 0,
      taskName: '',
      description: '',
      dueDate: '',
      priority: '',
      status: '',
      project: { projectId: 0 },
      user: { userId: 0 },
    };

  }
  getTasksByCategory(): void {
    this.clearMessage();
    if (this.categoryId > 0) {
      // Call the service to get tasks by categoryId
      this.taskService.getTasksByCategoryId(this.categoryId).subscribe(
        (tasks) => {
          if (tasks.length === 0) {
            this.message = `No tasks found for Category ID: ${this.categoryId}`;
          } else {
            this.tasks = tasks; // Assign the fetched tasks to the tasks array
          }
        },
        (error) => {
          this.message = `Error fetching tasks for Category ID: ${this.categoryId}, ${error.message}`;
        }
      );
    } else {
      this.message = 'Please enter a valid Category ID.';
    }
  }
 
 
 
 
  onFormSubmit(): void {
    this.clearMessage();
    switch (this.selectedAction) {
      case 'create':
        this.createTask();
        break;
      case 'update':
        this.updateTask(this.task.taskId);
        break;
      case 'delete':
        this.deleteTask();
        break;
      case 'getByPriorityAndStatus':
        this.getTasksByPriorityAndStatus();
        break;
      case 'getByUserAndStatus':
        this.getTasksByUserIdAndStatus();
        break;
      case 'getByCategory':
        this.getTasksByCategory();
        break;
      case 'getDueSoon':
        this.getTasksDueSoon();
        break;
      case 'getOverdue':
        this.getOverdueTasks();
        break;
      default:
        this.message = 'Invalid action selected.';
        break;
    }
  }
 
  selectAction(action: string): void {
    this.selectedAction = action;
    console.log('Selected action:', this.selectedAction);
    this.clearMessage();
    this.clearTask();
    this.tasks = [];
    this.noDueTasks = false;
    if(action == "getOverdue"){
      this.getOverdueTasks();
    }
    if(action == "getDueSoon"){
      this.getTasksDueSoon();
    }
  }
 
  isSubmitDisabled(): boolean {
    return !this.task.taskName || !this.task.dueDate || !this.task.priority || !this.task.status;
  }
 
  clearTask(): void {
    this.task = {
      taskId: 0,
      taskName: '',
      description: '',
      dueDate: '',
      priority: '',
      status: '',
      project: { projectId: 0 },
      user: { userId: 0 },
    };
    this.taskIdToDelete = 0;
  }
 
  clearMessage(): void {
    this.message = '';
  }
}
 
 