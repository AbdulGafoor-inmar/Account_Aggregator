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
  public accountTypes: any[] = ["Savings", "Current", "Salary", "Fixed Deposit", "Recurring Deposit", "NRI"];
  public creditCardOptions: any[] = ["Regular","Premium","Super Premium","Co-branded","Commercial or Business","CashBack","Secured","Fuel","Shopping","Travel"];

  public selectedBank: string = '';
  public selectedBankType: string = '';
  public selectedCreditCard: string = '';

  public isCreditCardSelected: boolean = false;
  public isBankTypeSelected: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data.accounts;
    });

    this.filterTransactions('All');
  }

  onSelectionChange(): void {
    if (this.selectedBank && this.selectedBankType) {
      this.transactions = this.generateTransactions(1000);
      this.filterTransactions(this.activeTab);  // Update the filtered transactions
    }
  }

  onBankTypeChange(): void {
    if (this.selectedBankType) {
      this.isBankTypeSelected = true;
      this.isCreditCardSelected = false;
      if (this.selectedBank && this.selectedBankType) {
        this.transactions = this.generateTransactions(1000);
        this.filterTransactions(this.activeTab);
      }
    } else {
      this.isBankTypeSelected = false;
    }
  }

  onCreditCardChange(): void {
    if (this.selectedCreditCard) {
      this.isCreditCardSelected = true;
      this.isBankTypeSelected = false;
      if (this.selectedBank && this.selectedCreditCard) {
        this.transactions = this.generateTransactions(1000);
        this.filterTransactions(this.activeTab);
      }
    } else {
      this.isCreditCardSelected = false;
    }
  }

  filterTransactions(type: string): void {
    this.activeTab = type;
    if (type === 'All') {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.status === type);
    }
    this.filteredTransactions.sort((a, b) => this.compareDates(b.date, a.date));
  }

  compareDates(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getTime() - d2.getTime(); // Ascending order, switch to d2 - d1 for descending
  }

  // Generate 100 random transactions
  generateTransactions(count: number): any[] {
    const transactions = [];
    for (let i = 0; i < count; i++) {
      transactions.push({
        date: this.getRandomDate(),
        time: this.getRandomTime(),
        transactionId: this.getRandomTransactionId(),
        name: this.getRandomName(),
        amount: this.getRandomAmount(),
        status: this.getRandomStatus()
      });
    }
    return transactions;
  }

  // Generate random transaction ID based on selected bank and type
  getRandomTransactionId() {
    const bankPrefix = this.selectedBank ? this.selectedBank.slice(0, 3).toUpperCase() : 'UNK'; // Use "UNK" if no bank is selected
    let typePrefix = null;
    if(this.isBankTypeSelected) {
      typePrefix = this.selectedBankType ? this.selectedBankType.slice(0, 3).toUpperCase() : 'UNK'; // Use "UNK" if no bank type is selected
    }
    else if(this.isCreditCardSelected){
      typePrefix = this.selectedCreditCard ? this.selectedCreditCard.slice(0, 3).toUpperCase() : 'UNK'; // Use "UNK" if no bank type is selected
    }
    const randomNumber = Math.floor(Math.random() * 1000000000000).toString();
    const transactionId = bankPrefix + randomNumber + typePrefix;

    return transactionId;
  }

  // Generate random name
  getRandomName() {
    const names = [
      'John Doe', 'Jane Smith', 'Horew Doree', 'Karee Palu', 'Team6', 'Matheu Pre',
      'Alice Cooper', 'Bob Marley', 'Emily Brown', 'Michael Johnson', 'Sarah Williams',
      'Chris Evans', 'Natalie Porter', 'Daniel Craig', 'Sophia Loren', 'James Bond',
      'Olivia Harris', 'Liam Scott', 'Ava Green', 'Ethan Turner', 'Isabella White',
      'Noah Adams', 'Mia Lewis', 'Lucas Wright', 'Amelia Lee', 'Mason Clark',
      'Harper King', 'Elijah Hall', 'Charlotte Young', 'Benjamin Torres',
      'Emma Turner', 'Alexander Baker', 'Oliver Perez', 'David Mitchell', 'Jacob Thompson',
      'Jackson Parker', 'Sophie Robinson', 'Grace Edwards', 'Leo Martinez', 'Abigail Moore',
      'Ella Walker', 'Henry Allen', 'Scarlett Stewart', 'Milo Foster', 'Hannah Brooks',
      'Zoe Cox', 'Owen Bailey', 'Aiden Sanders', 'Eva Nelson', 'Evelyn Howard',
      'Gabriel Campbell', 'Ruby Davis', 'Nathaniel Cook', 'Samuel Morris'
    ];

    return names[Math.floor(Math.random() * names.length)];
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

  // Generate random status
  getRandomStatus() {
    const statuses = ['Deposit', 'Withdrawal'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
}
