import { Component } from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
isData:boolean=false;

  accounts: any[] = []; // Holds account data

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data.accounts; // Assuming the JSON structure has a key 'accounts'
    });
  }

}
