import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification, NotificationProjection } from '../../models/notification.model';
 
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:8091/api/notifications';
 
  constructor(private http: HttpClient) {}
 
 
  // GET: Fetch all notifications
  getAllNotifications(): Observable<NotificationProjection[]> {
    return this.http.get<NotificationProjection[]>(`${this.baseUrl}/all`);
  }
 
  // GET: Fetch a notification by ID
  getNotificationById(notificationId: number): Observable<NotificationProjection> {
    return this.http.get<NotificationProjection>(`${this.baseUrl}/${notificationId}`);
  }
 
  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/post`, notification);
  }
 
  updateNotification(notificationId: number, updatedNotification: Notification): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${notificationId}`, updatedNotification);
  }
 
 
  // DELETE: Delete a notification by ID
  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${notificationId}`);
  }
}
 
 