import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<{ message: string }[]>();
  private notifications: { message: string }[] = [];

  notifications$ = this.notificationsSubject.asObservable(); // Expose notifications as an observable

  // Add a new notification
  addNotification(notification: { message: string }) {
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications); // Notify subscribers
  }

  // Get all notifications
  getNotifications(): { message: string }[] {
    return this.notifications;
  }

  // Clear all notifications
  clearNotifications() {
    this.notifications = [];
    this.notificationsSubject.next(this.notifications); // Notify subscribers
  }
}
