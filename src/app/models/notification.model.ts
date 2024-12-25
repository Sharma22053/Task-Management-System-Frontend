// Combined Notification interface with simplified reference to User (userId only)
export interface Notification {
    notificationId: number;
    text: string;
    createdAt: string;  // Represented as string for easier date handling
    user: { userId: number };  // Simplified reference to User (userId only)
  }
  
  // Projection Interface
  export interface NotificationProjection {
    notificationId: number;
    text: string;
    createdAt: string;  // Use string for dates in Angular
    userId: number;
  }
  