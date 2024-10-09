import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {NotificationService} from "./services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'acc-agg-web';
  activeTab: string = 'dashboard';
  showNavbar = true;
  isChatbotOpen = false;
  showNotifications: boolean = false;
  notifications: { message: string }[] = [];
  constructor(private router: Router, private notificationService: NotificationService) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !this.router.url.includes('/signup') && !this.router.url.includes('/login');
      }
    });
  }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        const currentRoute = this.router.url.split('/')[1];
        this.setActiveTab(currentRoute);
      }
    });

    this.notificationService.notifications$.subscribe(
      notifications => this.notifications = notifications
    );
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
  toggleChatbot() {
    this.isChatbotOpen = !this.isChatbotOpen;
  }
  OnDashboardClick(): void {
    this.setActiveTab('dashboard');
    this.router.navigate(['/dashboard']);
  }

  OnConsentsClick(): void {
    this.setActiveTab('consents');
    this.router.navigate(['/consents']);
  }
  OnBudgetClick(): void {
    this.setActiveTab('budget');
    this.router.navigate(['/budget']);
  }
  OnLogoutClick(): void {
    this.router.navigate(['/signup']);
  }

  OnAccountsClick(): void {
    this.setActiveTab('accounts');
    this.router.navigate(['/accounts']);
  }

  OnTransactionsClick(): void {
    this.setActiveTab('transactions');
    this.router.navigate(['/transactions']);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
