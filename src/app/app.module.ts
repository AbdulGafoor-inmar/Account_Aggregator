import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsentComponent } from './consent/consent.component';
import { AccountsComponent } from './accounts/accounts.component';
import {RouterModule, Routes} from "@angular/router";
import { ActiveConsentComponent } from './consent/active-consent/active-consent.component';
import { InactiveConsentComponent } from './consent/inactive-consent/inactive-consent.component';
import { AddNewBankAccountComponent } from './add-new-bank-account/add-new-bank-account.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'homepage', pathMatch: 'full' ,component: DashboardComponent },
  { path: 'dashboard', pathMatch: 'full' , component: DashboardComponent },
  { path: 'consents', pathMatch: 'full' , component: ConsentComponent },
  { path: 'accounts', pathMatch: 'full' , component: AccountsComponent },
  { path: 'active-consents', pathMatch: 'full' , component: ActiveConsentComponent },
  { path: 'inactive-consents', pathMatch: 'full' , component: InactiveConsentComponent },
  { path: 'add-bankaccount', pathMatch: 'full' , component: AddNewBankAccountComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConsentComponent,
    AccountsComponent,
    ActiveConsentComponent,
    InactiveConsentComponent,
    AddNewBankAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
