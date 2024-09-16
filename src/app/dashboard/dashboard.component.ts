import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  accounts: any[] = []; // Holds account data
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data.accounts; // Assuming the JSON structure has a key 'accounts'
    });
  }
}

