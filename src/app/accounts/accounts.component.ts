import { Component } from '@angular/core';
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
isData:boolean=false;

  accounts: any[] = [];
  selectedAccount: any = null;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data.accounts;
    });
  }
  showDetails(account: any): void {
    this.selectedAccount = account;
  }
}
