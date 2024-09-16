import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private jsonUrl = 'JsonData/AccountDetails.json'; // Path to the JSON file

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get(this.jsonUrl); // Make the HTTP GET request
  }
}
