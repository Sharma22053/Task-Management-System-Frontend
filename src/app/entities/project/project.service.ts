import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project,ProjectProjection } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8091/api/projects';

  constructor(private http: HttpClient) { }

  // POST - Create a new project
  createNewProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/post`, project);
  }

  // GET - Fetch ongoing projects
  getOngoingProjects(): Observable<ProjectProjection[]> {
    return this.http.get<ProjectProjection[]>(`${this.apiUrl}/ongoing`);
  }

  // GET - Fetch projects within a date range
  getProjectsInDateRange(startDate: string, endDate: string): Observable<ProjectProjection[]> {
    return this.http.get<ProjectProjection[]>(`${this.apiUrl}/date-range/${startDate}/${endDate}`);
  }

  // GET - Fetch projects by status
  getProjectsByStatus(status: string): Observable<ProjectProjection[]> {
    return this.http.get<ProjectProjection[]>(`${this.apiUrl}/status/${status}`);
  }

  // GET - Fetch projects with high priority tasks
  getProjectsWithHighPriority(): Observable<ProjectProjection[]> {
    return this.http.get<ProjectProjection[]>(`${this.apiUrl}/high-priority-tasks`);
  }

  // PUT - Update project details
  updateProjectDetails(projectId: number, updatedProjectDetails: Project): Observable<ProjectProjection> {
    return this.http.put<ProjectProjection>(`${this.apiUrl}/update/${projectId}`, updatedProjectDetails);
  }

  deleteProjectById(projectId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${projectId}`, { responseType: 'text' });
  }

  // GET - Fetch projects by user role
  getProjectsByUserRole(roleName: string): Observable<ProjectProjection[]> {
    return this.http.get<ProjectProjection[]>(`${this.apiUrl}/user-role/${roleName}`);
  }
}
