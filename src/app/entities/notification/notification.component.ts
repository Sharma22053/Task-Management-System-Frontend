import { Component, OnInit } from '@angular/core'; // Import OnInit
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notification, NotificationProjection } from '../../models/notification.model';
 
@Component({
  selector: 'notification-crud',
  templateUrl: './notification.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [NotificationService],
})
export class NotificationComponent implements OnInit {  // Implement OnInit
  // Initial notification object
  notification: Notification = {
    notificationId: 0, // Default value
    text: '',
    createdAt: '',
    user: { userId: 0 }, // Default user
  };
 
  notificationList: NotificationProjection[] = [];
  message: string = '';
  selectedAction: string = '';
  isSidebarCollapsed: boolean = false;  // Track sidebar state
 
  constructor(private notificationService: NotificationService) {}
 
  ngOnInit(): void {
 
  }
 
  // Select user action
  selectAction(action: string): void {
    this.selectedAction = action;
    this.resetForm();
    this.resetMessage();
  }
 
  // Submit form
  onFormSubmit(): void {
    this.resetMessage();
 
    if (this.selectedAction === 'create') {
      this.createNotification();
    } else if (this.selectedAction === 'update') {
      this.updateNotification();
    } else if (this.selectedAction === 'getById') {
      this.getNotificationById();
    } else if (this.selectedAction === 'delete') {
      this.deleteNotification();
    } else {
      this.message = 'Please select a valid action.';
    }
  }
 
  // Create Notification
  createNotification(): void {
    this.notificationService.createNotification(this.notification).subscribe({
      next: (data) => {
        this.message = 'Notification created successfully!';
        this.getListOfAllNotifications(); // Refresh notifications list
        this.resetForm(); // Reset form after creation
      },
      error: (err) => {
        this.message = `Error creating notification: ${err.message}`;
      },
    });
  }
 
  // Update Notification
  updateNotification(): void {
    this.notificationService.updateNotification(this.notification.notificationId, this.notification).subscribe({
      next: () => {
        this.message = 'Notification updated successfully!';
        this.getListOfAllNotifications(); // Refresh list
        this.resetForm();
      },
      error: (err) => {
        this.message = `Error updating notification: ${err.message}`;
      },
    });
  }
 
  // Get Notification by ID
  getNotificationById(): void {
    this.notificationService
      .getNotificationById(this.notification.notificationId)
      .subscribe({
        next: (data) => {
          this.notificationList = [data]; // Show only one result
          this.message = 'Notification fetched successfully!';
        },
        error: (err) => {
          this.message = `Error fetching notification: ${err.message}`;
        },
      });
  }
 
  // Delete Notification
  deleteNotification(): void {
    this.notificationService
      .deleteNotification(this.notification.notificationId)
      .subscribe({
        next: () => {
          this.message = 'Notification deleted successfully!';
          this.notificationList = this.notificationList.filter(
            (n) => n.notificationId !== this.notification.notificationId
          );
          this.resetForm();
        },
        error: (err) => {
          this.message = `Error deleting notification: ${err.message}`;
        },
      });
  }
 
  // Fetch all Notifications
  getListOfAllNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (data) => {
        this.notificationList = data;
        this.message = 'Notifications fetched successfully!';
      },
      error: (err) => {
        this.message = `Error fetching notifications: ${err.message}`;
      },
    });
  }
 
  // Reset form to initial state
  resetForm(): void {
    this.notification = {
      notificationId: 0,
      text: '',
      createdAt: '',
      user: { userId: 0 },
    };
  }
 
  // Reset message
  resetMessage(): void {
    this.message = '';
  }
 
  // Toggle Sidebar Visibility
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  // Disable Submit button based on action and validation
  isSubmitDisabled(): boolean {
    if (this.selectedAction === 'create') {
      return (
        !this.notification.text.trim() ||
        !this.notification.createdAt ||
        !this.notification.user.userId || this.notification.user.userId <= 0
      );
    }
 
    if (this.selectedAction === 'update') {
      return (
        !this.notification.notificationId || this.notification.notificationId <= 0 ||
        !this.notification.text.trim() ||
        !this.notification.createdAt ||
        !this.notification.user.userId || this.notification.user.userId <= 0
      );
    }
 
    if (this.selectedAction === 'getById' || this.selectedAction === 'delete') {
      return !this.notification.notificationId || this.notification.notificationId <= 0;
    }
 
    return true;
  }
}
 
 