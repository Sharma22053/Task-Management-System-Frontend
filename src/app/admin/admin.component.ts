import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterOutlet,RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports : [CommonModule,FormsModule,RouterOutlet,RouterModule]
})
export class AdminComponent implements OnInit {
  profileVisible = false;
  user: any;
  isNavigated: boolean = false;
  isCollapsed = false;
  pleaseHide : boolean = false;


  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get the user data from sessionStorage
    this.user = JSON.parse(sessionStorage.getItem('roles') || '{}')[0]; // Assuming first role is the main one
  }

 
  canIHideThis(){
    this.pleaseHide = !this.pleaseHide;
  }

  toggleProfileDropdown(): void {
    this.profileVisible = !this.profileVisible;
  }

  onLogout(): void {
    const confirmation = confirm('Do you really want to log out?');
    if (confirmation) {
      sessionStorage.clear();
      this.router.navigate(['/home']);
    }
  }

  navigated(){
    this.isNavigated = true;
}

toggleSidebar() {
  this.isCollapsed = !this.isCollapsed;
}
}
