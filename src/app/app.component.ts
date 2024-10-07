import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'acc-agg-web';
  activeTab: string = 'dashboard'; // Set a default active tab
  showNavbar = true;
  isChatbotOpen = false;
  constructor(private router: Router) {
    // Listen to route changes to dynamically show/hide the navbar
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !this.router.url.includes('/signup') && !this.router.url.includes('/login');
      }
    });
  }

  ngOnInit(): void {
    // Listen for route changes and set the active tab accordingly
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Extract the current route after '/'
        const currentRoute = this.router.url.split('/')[1];
        this.setActiveTab(currentRoute);
      }
    });
  }

  // Toggle the chatbot's visibility
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
