import { Component } from '@angular/core';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  budgetCategories = [
    { name: 'Auto & Transport', spent: 0, total: 0 },
    { name: 'Bills & Utilities: Utilities', spent: 0, total: 0 },
    { name: 'Entertainment', spent: 0, total: 0 },
    { name: 'Personal Care', spent: 0, total: 0 },
    { name: 'Food & Dining: Restaurants', spent: 0, total: 0 },
    { name: 'Health & Fitness', spent: 0, total: 0 },
    { name: 'Home: Mortgage & Rent', spent: 0, total: 0 },
  ];
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  availableYears: number[] = [2021, 2022, 2023, 2024];
  availableMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  totalLeftover: number = 0;
  showCreateBudgetForm: boolean = false;
  showNotifications: boolean = false;
  notifications: { message: string }[] = []; // To hold notifications

  constructor(private notificationService: NotificationService) {}

  triggerNotification(category: any): void {
    const notificationMessage = `You have spent more than 90% of your budget for ${category.name}!`;
    this.notificationService.addNotification({ message: notificationMessage });
  }
  ngOnInit() {
    this.budgetCategories.forEach(category => {
      category.total = this.getRandomInt(100, 1500);
      category.spent = this.getRandomInt(0, category.total * 1.5);
      this.checkForNotifications(category); // Check for notifications on init
    });
    this.calculateTotalLeftover();
  }

  filterTransactionsByDate(): void {
    this.budgetCategories.forEach(category => {
      category.total = this.getRandomInt(100, 1500);
      category.spent = this.getRandomInt(0, category.total * 1.5);
      this.checkForNotifications(category); // Check for notifications on filter
    });
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toggleCreateBudgetForm() {
    this.showCreateBudgetForm = !this.showCreateBudgetForm;
  }

  addNewBudget(category: string, amount: number) {
    const newCategory = {
      name: category,
      spent: 0,
      total: amount
    };
    this.budgetCategories.push(newCategory);
    this.checkForNotifications(newCategory); // Check new budget category for notifications
    this.calculateTotalLeftover();
    this.showCreateBudgetForm = false;
  }

  calculateTotalLeftover(): void {
    let totalSpent = 0;
    let totalBudgeted = 0;

    this.budgetCategories.forEach(category => {
      totalSpent += category.spent;
      totalBudgeted += category.total;
    });

    this.totalLeftover = totalBudgeted - totalSpent;
  }

  getBarColor(category: any): string {
    const percentage = (category.spent / category.total) * 100;
    if (percentage < 70) {
      return 'green';
    } else if (percentage >= 70 && percentage <= 90) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  checkForNotifications(category: any): void {
    const percentage = (category.spent / category.total) * 100;
    if (percentage > 90) {
      this.triggerNotification(category);
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
}
