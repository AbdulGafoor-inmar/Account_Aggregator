import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrl: './consent.component.css'
})
export class ConsentComponent {

  constructor(public router: Router) {

  }
  OnActiveConsentClick(){
    this.router.navigate(['/activeconsents']);
  }
  OnInActiveConsentClick(){
    this.router.navigate(['/inactiveconsents'])
  }
  OnRefreshClick(){
    //this.router.
  }
}
