import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskProjection } from '../../models/task.model'; // Adjust the path if needed
 
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8091/api/tasks'; // Adjust the URL to match your API endpoint
 
  constructor(private http: HttpClient) {}
 
  // Fetch all tasks
  getTasks(): Observable<TaskProjection[]> {
    return this.http.get<TaskProjection[]>(this.apiUrl);
  }
 
  // Fetch tasks due soon
  getTasksDueSoon(): Observable<TaskProjection[]> {
    return this.http.get<TaskProjection[]>(`${this.apiUrl}/due-soon`);
  }
 
  // Fetch overdue tasks
  getOverdueTasks(): Observable<TaskProjection[]> {
    return this.http.get<TaskProjection[]>(`${this.apiUrl}/overdue`);
  }
 
  // Fetch tasks by priority and status
  getTasksByPriorityAndStatus(priority: string, status: string): Observable<TaskProjection[]> {
    return this.http.get<TaskProjection[]>(`${this.apiUrl}/priority/${priority}/status/${status}`);
  }
 
  // Fetch tasks by user ID and status
  getTasksByUserIdAndStatus(userId: number, status: string): Observable<TaskProjection[]> {
    return this.http.get<TaskProjection[]>(
      `${this.apiUrl}/user/${userId}/status/${status}`
    );
  }
  
 
  // Fetch tasks by category ID
  // TaskService: Ensure this method exists and is working
getTasksByCategoryId(categoryId: number): Observable<TaskProjection[]> {
  return this.http.get<TaskProjection[]>(`${this.apiUrl}/category/${categoryId}`);
}
 
  // Create a new task
  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, task);
  }
 
  // Update an existing task
  updateTask(taskId: number, task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${taskId}`, task);
  }
 
  // Delete a task
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
 
 