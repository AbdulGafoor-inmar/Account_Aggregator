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
      console.log('Selected institutions:', this.selectedInstitutions);
      // Example API call (adjust URL and method as needed):
      // this.http.post('your-api-endpoint', { institutions: this.selectedInstitutions })
      //   .subscribe(response => console.log(response));
    } else {
      alert('Please select at least one institution');
    }
  }

  cancel(): void {
    this.selectedInstitutions = [];
  }
}
