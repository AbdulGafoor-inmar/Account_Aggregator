import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css']
})
export class CreateBudgetComponent {
  @Output() budgetCreated = new EventEmitter<{ category: string, amount: number }>();


  availableCategories = [
    'Auto & Transport',
    'Bills & Utilities',
    'Business Sengres',
    'Education',
    'Entertainment',
    'Fees & Charges',
    'Financial',
    'Food & Dining',
    'Gifts & Donations',
    'Health & Fitness',
    'Home',
    'Income',
    'Investments',
    'Kids',
    'Misc Expenses',
    'Personal Care',
    'Pets',
    'Shopping',
    'Taxes',
    'Transfer',
    'Travel'
  ];

  selectedCategory: string = '';
  budgetAmount: number | null = null;


  addBudget() {
    if (this.selectedCategory && this.budgetAmount) {
      this.budgetCreated.emit({
        category: this.selectedCategory,
        amount: this.budgetAmount
      });


      this.selectedCategory = '';
      this.budgetAmount = null;
    }
  }


  cancel() {
    this.selectedCategory = '';
    this.budgetAmount = null;
  }
}
