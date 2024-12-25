import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterOutlet,RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EmployeeService } from "./employee.service";


@Component({
  selector: 'employee-root',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  imports : [CommonModule,FormsModule,RouterModule],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  profileVisible = false;
  activeSection: string | null = null;
  user: any;
  userId: number | null = null;
  projects: any[] = [];
  tasks: any[] = [];
  notifications:any[] = [];
  comments:any[]= [];
  attachments:any[]=[];
  categories:any[]=[];
  isCollapsed = false;
  isClicked : boolean = false ;
  isDropDownOpen: boolean = false;
  switchCaseToDisplay: string = '';
  

  constructor(private router: Router,private employeeService: EmployeeService ) {}

  ngOnInit(): void {
    // Get the user data from sessionStorage
    this.user = JSON.parse(sessionStorage.getItem('roles') || '{}')[0]; // Assuming first role is the main one
    this.userId = this.user?.userId; 
  }

  navigated(){
    this.isClicked = true;
  }
  

  getProjects(): void {
    this.switchCaseToDisplay = "project";
    if (this.userId) {
      this.employeeService.getProjectsByUserId(this.userId).subscribe(
        (response) => {
          this.projects = response; // Store the projects in the component
          console.log('Projects fetched:', this.projects);
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    }
  }

  getTasks():void{
    this.switchCaseToDisplay = "task";
    if(this.userId){
      this.employeeService.getTasksByUserId(this.userId).subscribe(
        (response:any[]) => {
          this.tasks = response; // Store the tasks in the component
          console.log('Tasks Fetched:',this.tasks); 
        },
        (error) => {
          console.error('Error getting tasks: ',error);
        }
      )
    }
  }

  getNotifications():void{
    this.switchCaseToDisplay = "notification";
    if(this.userId){
      this.employeeService.getNotificationsByUserId(this.userId).subscribe(
        (response:any[]) => {
          this.notifications = response; // Store the tasks in the component
          console.log('Notifications Fetched:',this.notifications);      
        },
        (error) => {
          console.error('Error getting notifications: ',error);
        }
      )
    }
  }

  getComments():void{
    this.switchCaseToDisplay = "comment";
    if(this.userId){
      this.employeeService.getCommentsByUserId(this.userId).subscribe(
        (response:any[]) => {
          this.comments = response; // Store the tasks in the component
          console.log('Comments Fetched:',this.comments);      
        },
        (error) => {
          console.error('Error getting comments: ',error);
        }
      )
    }
  }

  getAttachments():void{
    this.switchCaseToDisplay = "attachments";
    if(this.userId){
      this.employeeService.getAttachmentsByUserId(this.userId).subscribe(
        (response:any[]) => {
          this.attachments = response; // Store the tasks in the component
          console.log('Attachments Fetched:',this.attachments);      
        },
        (error) => {
          console.error('Error getting attachments: ',error);
        }
      )
    }
  }

  getCategories():void{
    this.switchCaseToDisplay = "categories";
    if(this.userId){
      this.employeeService.getCategoriesByUserId(this.userId).subscribe(
        (response:any[]) => {
          this.categories = response; // Store the tasks in the component
          console.log('Categories Fetched:',this.categories);      
        },
        (error) => {
          console.error('Error getting categories: ',error);
        }
      )
    }
  }



  toggleProfileDropdown(): void {
    this.profileVisible = !this.profileVisible;
  }

  toggleSection(section: string): void {
    // Toggles the clicked section; collapses others
    this.activeSection = this.activeSection === section ? null : section;
  }

  onLogout(): void {
    const confirmation = confirm('Do you really want to log out?');
    if (confirmation) {
      sessionStorage.clear();
      this.router.navigate(['/home']);
    }
  }

  setActive(section: string): void {
    this.activeSection = section;
    // Fetch related data based on the active section
    if (section === 'assignedProjects') {
      this.getProjects();
    } else if (section === 'assignedTasks') {
      this.getTasks();
    } else if (section === 'notifications') {
      this.getNotifications();
    } else if (section === 'comments') {
      this.getComments();
    } else if (section === 'taskAttachments') {
      this.getAttachments();
    } else if (section === 'categories') {
      this.getCategories();
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  dropDown(){
    this.isDropDownOpen = !this.isDropDownOpen;
  }
  
}