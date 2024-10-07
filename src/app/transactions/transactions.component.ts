import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  activeTab: string = 'All';
  accounts: any[] = [];
  selectedAccounts: any[] = []; // Track selected accounts

  // List of possible transaction descriptions
  transactionDescriptions: string[] = [
    "ATM Withdrawal",
    "Online Shopping",
    "Salary Credit",
    "Bill Payment",
    "Transfer to Savings",
    "Fuel Purchase",
    "Grocery Shopping",
    "EMI Payment",
    "Loan Disbursement",
    "Dining Out",
    "Utility Bill Payment",
    "Rent Payment",
    "Credit Card Payment",
    "Cash Deposit",
    "Investment Purchase",
    "Refund"
  ];

  isAddingTransaction = false; // Controls whether the add transaction row is visible
  newTransaction = { date: '', time: '', name: '', description: '', amount: 0, color: '' };


  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    // Get all accounts and generate transactions for each account
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data.accounts;

      // Initially generate transactions for all accounts
      this.accounts.forEach(account => {
        const accountTransactions = this.generateTransactions(100, account);
        this.transactions = [...this.transactions, ...accountTransactions]; // Merge transactions
      });

      // Initially filter to show 'All' transactions
      this.filterTransactions('All');
    });
  }
  addNewTransaction() {
    this.isAddingTransaction = true;
    this.newTransaction = { date: '', time: '', name: '', description: '', amount: 0, color: '' }; // Reset form
  }

  // Save the new transaction
  saveNewTransaction() {
    const transaction = {
      date: this.newTransaction.date,
      time: this.newTransaction.time,
      name: this.newTransaction.name,
      description: this.newTransaction.description,
      amount: this.newTransaction.amount,
      color: this.newTransaction.amount >= 0 ? 'green' : 'red', // Green for positive, red for negative
      isEditing: false
    };

    // Add the new transaction to the list
    this.transactions.push(transaction);

    // Reset the form and hide the add transaction row
    this.isAddingTransaction = false;
    this.newTransaction = { date: '', time: '', name: '', description: '', amount: 0, color: '' };

    // Update the filtered transactions list
    this.filterTransactions(this.activeTab);
  }

  // Cancel adding the new transaction
  cancelNewTransaction() {
    this.isAddingTransaction = false; // Hide the add transaction row
  }

  onSelectionChange(account: any): void {
    // Reset the transactions to only show transactions for selected accounts
    this.transactions = [];

    // If the account is already selected, remove it from the selectedAccounts
    if (this.selectedAccounts.includes(account)) {
      this.selectedAccounts = this.selectedAccounts.filter(acc => acc !== account);
    } else {
      this.selectedAccounts.push(account); // Add selected account to the list
    }

    // If no account is selected, show transactions for all accounts
    if (this.selectedAccounts.length === 0) {
      this.accounts.forEach(acc => {
        const accountTransactions = this.generateTransactions(100, acc);
        this.transactions = [...this.transactions, ...accountTransactions]; // Merge transactions
      });
    } else {
      // Generate transactions only for selected accounts
      this.selectedAccounts.forEach(acc => {
        const accountTransactions = this.generateTransactions(100, acc);
        this.transactions = [...this.transactions, ...accountTransactions]; // Merge transactions
      });
    }

    this.filterTransactions(this.activeTab);  // Update the filtered transactions
  }

  filterTransactions(type: string): void {
    this.activeTab = type;

    if (type === 'All') {
      this.filteredTransactions = this.transactions;
    } else if (type === 'Credit') {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.color === 'green');
    } else if (type === 'Debit') {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.color === 'red');
    } else {
      this.filteredTransactions = this.transactions;
    }

    this.filteredTransactions.sort((a, b) => this.compareDates(b.date, a.date));
  }

  compareDates(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getTime() - d2.getTime(); // Ascending order, switch to d2 - d1 for descending
  }

  // Generate random transactions for an account
  generateTransactions(count: number, account: any): any[] {
    const transactions = [];
    for (let i = 0; i < count; i++) {
      transactions.push({
        date: this.getRandomDate(),
        time: this.getRandomTime(),
        name: this.getRandomName(account),
        description: this.getRandomDescription(), // Assign a random description
        amount: this.getRandomAmount(),
        color: this.getRandomColor(),  // Assign random green or red color
        isEditing: false // Property to track edit mode
      });
    }
    return transactions;
  }

  // Generate random name based on bank and account type
  getRandomName(account: any) {
    return `${account.bankName}-${account.accountType}`;
  }

  // Generate random amount
  getRandomAmount() {
    return Math.floor(Math.random() * 5000) + 1; // Random amount between 1 and 5000
  }

  // Generate random date between Jan 1, 2020, and today
  getRandomDate() {
    const start = new Date(2020, 0, 1); // Start date: Jan 1, 2020
    const end = new Date(); // Today's date
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Generate random time
  getRandomTime() {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hour}:${minute} ${ampm}`;
  }

  // Generate random color (Green or Red) for the amount
  getRandomColor() {
    return Math.random() > 0.5 ? 'green' : 'red';
  }

  // Generate random transaction description
  getRandomDescription() {
    const randomIndex = Math.floor(Math.random() * this.transactionDescriptions.length);
    return this.transactionDescriptions[randomIndex];
  }

  // Enable edit mode for a transaction
  editTransaction(transaction: any): void {
    transaction.isEditing = true;
  }

  // Save the edited transaction
  saveTransaction(transaction: any): void {
    transaction.isEditing = false; // Exit edit mode
    // Add logic to save the transaction if required (e.g., API call)
  }

  // Cancel the edit
  cancelEdit(transaction: any): void {
    transaction.isEditing = false; // Exit edit mode without saving
  }
}
