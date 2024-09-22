import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private AccountDetailsJsonUrl = 'JsonData/AccountDetails.json';
  private TransactionsJsonUrl = 'JsonData/TransactionsDetails.json';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get(this.AccountDetailsJsonUrl); // Make the HTTP GET request
  }
  getTransactions(): Observable<any> {
    return this.http.get(this.TransactionsJsonUrl); // Make the HTTP GET request
  }
}
