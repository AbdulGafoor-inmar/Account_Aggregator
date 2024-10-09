import {Component, OnInit, ViewChild} from '@angular/core';
import { AccountService } from '../services/account.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type StackedChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

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
  selectedAccounts: any[] = [];

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
  transactionCategory:string[]=["Utility","Food","Fuel","Shopping","Medical","Others"];

  isAddingTransaction = false;
  newTransaction = { date: '', time: '', name: '', description: '', category: '', amount: 0, color: '' };

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  availableYears: number[] = [2021, 2022, 2023, 2024];
  availableMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public chartOptions: Partial<ChartOptions>;
  public stackedCartOptions: Partial<StackedChartOptions>;
  constructor(private accountService: AccountService) {
    this.chartOptions = {
      series: [this.getRandomAmount(),this.getRandomAmount(),this.getRandomAmount(),this.getRandomAmount(),
      this.getRandomAmount(),this.getRandomAmount()],
      chart: {
        type: "donut"
      },
      labels: ["Utility","Food","Fuel","Shopping","Medical","Others"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 400,
              width: 1200
            },
            legend: {
              position: "bottom",
            },
          }
        }
      ]
    };
    this.stackedCartOptions = {
      series: [
        {
          name: "Utility",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]
        },
        {
          name: "Food",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]    },
        {
          name: "Fuel",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]    },
        {
          name: "Shopping",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]    },
        {
          name: "Medical",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]     },
        {
          name: "Others",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber()]
        },
      ],
      chart: {
        type: "bar",
        height: 450,
        width: 600,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: "Monthly Total"
      },
      xaxis: {
        categories: ["Week 1","Week 2","Week 3","Week 4"],
        labels: {
          formatter: function(val) {
            return "₹" + val;
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "₹" + val;
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }

  getDonutChart(){
    this.chartOptions = {
      series: [this.getRandomAmount(),this.getRandomAmount(),this.getRandomAmount(),this.getRandomAmount(),
        this.getRandomAmount(),this.getRandomAmount()],
      chart: {
        type: "donut"
      },
      labels: ["Utility","Food","Fuel","Shopping","Medical","Others"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 400,
              width: 1200
            },
            legend: {
              position: "bottom",
            },
          }
        }
      ]
    };
  }
  getStackedBarChart(){
    this.stackedCartOptions = {
      series: [
        {
          name: "Utility",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]
        },
        {
          name: "Food",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]    },
        {
          name: "Fuel",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]    },
        {
          name: "Shopping",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]    },
        {
          name: "Medical",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),
          ]     },
        {
          name: "Others",
          data: [this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber(),this.getRandomNumber()]
        },
      ],
      chart: {
        type: "bar",
        height: 450,
        width: 600,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: "Monthly Total"
      },
      xaxis: {
        categories: ["Week 1","Week 2","Week 3","Week 4"],
        labels: {
          formatter: function(val) {
            return "₹" + val;
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "₹" + val;
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data.accounts;

      this.accounts.forEach(account => {
        const accountTransactions = this.generateTransactions(4, account);
        this.transactions = [...this.transactions, ...accountTransactions];
      });

      this.filterTransactions('All');
    });
  }
  addNewTransaction() {
    this.isAddingTransaction = true;
    this.newTransaction = { date: '', time: '', name: '', description: '', category: '', amount: 0, color: '' };
  }

  filterTransactionsByDate(): void {
    this.getStackedBarChart();
    this.getDonutChart();
  }

  saveNewTransaction() {
    const transaction = {
      date: this.newTransaction.date,
      time: this.newTransaction.time,
      name: this.newTransaction.name,
      description: this.newTransaction.description,
      amount: this.newTransaction.amount,
      color: this.newTransaction.amount >= 0 ? 'green' : 'red',
      isEditing: false
    };

    this.transactions.push(transaction);

    this.isAddingTransaction = false;
    this.newTransaction = { date: '', time: '', name: '', description: '', category: '', amount: 0, color: '' };

    this.filterTransactions(this.activeTab);
  }

  cancelNewTransaction() {
    this.isAddingTransaction = false;
  }

  onSelectionChange(account: any): void {
    this.transactions = [];

    if (this.selectedAccounts.includes(account)) {
      this.selectedAccounts = this.selectedAccounts.filter(acc => acc !== account);
    } else {
      this.selectedAccounts.push(account);
    }

    if (this.selectedAccounts.length === 0) {
      this.accounts.forEach(acc => {
        const accountTransactions = this.generateTransactions(100, acc);
        this.transactions = [...this.transactions, ...accountTransactions];
      });
    } else {
      this.selectedAccounts.forEach(acc => {
        const accountTransactions = this.generateTransactions(100, acc);
        this.transactions = [...this.transactions, ...accountTransactions];
      });
    }

    this.filterTransactions(this.activeTab);
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
    return d1.getTime() - d2.getTime();
  }


  generateTransactions(count: number, account: any): any[] {
    const transactions = [];
    for (let i = 0; i < count; i++) {
      transactions.push({
        date: this.getRandomDate(),
        time: this.getRandomTime(),
        name: this.getRandomName(account),
        description: this.getRandomDescription(),
        category: this.getRandomCategory(),
        amount: this.getRandomAmount(),
        color: this.getRandomColor(),
        isEditing: false
      });
    }
    return transactions;
  }


  getRandomName(account: any) {
    return `${account.bankName}-${account.accountType}`;
  }


  getRandomAmount() {
    return Math.floor(Math.random() * 5000) + 800;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 100;
  }


  getRandomDate(): string {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().slice(0, 10);
  }


  getRandomTime() {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hour}:${minute} ${ampm}`;
  }


  getRandomColor() {
    return Math.random() > 0.5 ? 'green' : 'red';
  }


  getRandomDescription() {
    const randomIndex = Math.floor(Math.random() * this.transactionDescriptions.length);
    return this.transactionDescriptions[randomIndex];
  }

  getRandomCategory() {
    const randomIndex = Math.floor(Math.random() * this.transactionCategory.length);
    return this.transactionCategory[randomIndex];
  }


  editTransaction(transaction: any): void {
    transaction.isEditing = true;
  }


  saveTransaction(transaction: any): void {
    transaction.isEditing = false;

  }


  cancelEdit(transaction: any): void {
    transaction.isEditing = false;
  }
}
