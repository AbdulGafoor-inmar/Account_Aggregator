import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FipListResponse } from '../Models/FipListResponse.Model';
import { BankAccount } from "../Models/BankAccount.Model";

@Component({
  selector: 'app-add-new-bank-account',
  templateUrl: './add-new-bank-account.component.html',
  styleUrls: ['./add-new-bank-account.component.css']
})
export class AddNewBankAccountComponent implements OnInit {
  public banksList: FipListResponse = new FipListResponse();
  public username: string = 'Abd';
  public searchTerm: string = '';
  public filteredInstitutions: any[] = [];
  public selectedInstitutions: any[] = [];
  public linkAccountsTab: boolean = false;
  public selectBankTab: boolean = true;
  linkedStatus: { [key: string]: boolean } = {};
  currentStep = 1;
  public accountTypes:any[]=["Savings","Current","Salary","Fixed Deposit","Recurring Deposit","NRI"];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBankData();
  }

  getBankData(): void {
    const url = 'https://aa-app.onemoney.in/app/fip?v1=846475279116631.5';
    this.http.get<FipListResponse>(url).subscribe(
      response => {
        this.banksList = response;
        this.filteredInstitutions = this.banksList.fipList; // Initialize filteredInstitutions with the full list
        this.filteredInstitutions = this.banksList.fipList.map(institution => ({
          ...institution, // Spread the original institution properties
          accountType: this.getRandomAccountType(this.accountTypes), // Add random account type
          accountNumber: this.generateRandomFourDigits() // Add random 4-digit account number
        }));
      },
      error => {
        console.error('There was an error fetching the bank data!', error);
      }
    );
  }

  // Filter institutions based on the search term
  filterInstitutions(): void {
    if (this.searchTerm) {
      this.filteredInstitutions = this.banksList.fipList.filter(institution =>
        institution.fipName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredInstitutions = this.banksList.fipList; // Reset to the full list when search term is empty
    }
  }

  selectInstitution(institution: any): void {
    const index = this.selectedInstitutions.findIndex(selected => selected.fipName === institution.fipName);
    if (index === -1) {
      this.selectedInstitutions.push(institution);
    } else {
      this.selectedInstitutions.splice(index, 1); // Deselect if clicked again
    }
  }

  continue(): void {
    if (this.selectedInstitutions.length > 0) {
      if (this.currentStep < 2) {
        this.currentStep++;
        this.linkAccountsTab=true;
        this.selectBankTab=false;
      }
      else{
        this.currentStep--;
      }
    } else {
      alert('No institutions selected. Please select at least one institution.');
    }
  }

  cancel(): void {
    this.selectedInstitutions = [];
  }

  linkAccount(institution: any): void {
    this.linkedStatus[institution.fipName] = true;
  }
  isLinked(institution: any): boolean {
    return this.linkedStatus[institution.fipName] === true;
  }
  getRandomAccountType(accountTypes: string[]): string {
    const randomIndex = Math.floor(Math.random() * accountTypes.length);
    return accountTypes[randomIndex];
  }
  generateRandomFourDigits(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
