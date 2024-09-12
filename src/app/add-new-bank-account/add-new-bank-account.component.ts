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

  constructor(private http: HttpClient) {
    this.banksList= new FipListResponse;
  }

  ngOnInit(): void {
    this.getBankData();
  }

  getBankData(): void {
    const url = 'https://aa-app.onemoney.in/app/fip?v1=846475279116631.5';
    this.http.get<FipListResponse>(url).subscribe(
      response => {
        //console.log('Bank Data:', response);
        this.banksList = response; // Store the response in the banksList property
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  username: string = 'Abd';
  searchTerm: string = '';

  selectedInstitutions = [];

  selectInstitution(institution: any) {
    // if (!this.selectedInstitutions.includes(institution.fipName)) {
    //   this.selectedInstitutions.push(institution.fipName);
    // }
  }

  continue() {
    console.log('Selected institutions:', this.selectedInstitutions);
    // Example API call (adjust URL and method as needed):
    // this.http.post('your-api-endpoint', { institutions: this.selectedInstitutions })
    //   .subscribe(response => console.log(response));
  }

  cancel() {
    this.selectedInstitutions = [];
  }
}
