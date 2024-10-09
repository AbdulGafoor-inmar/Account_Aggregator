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
import { TransactionsComponent } from './transactions/transactions.component';
import {FormsModule} from "@angular/forms";
import { SignupComponent } from './signup/signup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { BudgetComponent } from './budget/budget.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'homepage', pathMatch: 'full' ,component: DashboardComponent },
  { path: 'dashboard', pathMatch: 'full' , component: DashboardComponent },
  { path: 'consents', pathMatch: 'full' , component: ConsentComponent },
  { path: 'accounts', pathMatch: 'full' , component: AccountsComponent },
  { path: 'active-consents', pathMatch: 'full' , component: ActiveConsentComponent },
  { path: 'inactive-consents', pathMatch: 'full' , component: InactiveConsentComponent },
  { path: 'add-bankaccount', pathMatch: 'full' , component: AddNewBankAccountComponent },
  { path: 'transactions', pathMatch: 'full' , component: TransactionsComponent },
  { path: 'budget', pathMatch: 'full' , component: BudgetComponent },
  { path: '**', redirectTo: '/login' }
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConsentComponent,
    AccountsComponent,
    ActiveConsentComponent,
    InactiveConsentComponent,
    AddNewBankAccountComponent,
    TransactionsComponent,
    SignupComponent,
    LoginPageComponent,
    OtpDialogComponent,
    ChatbotComponent,
    BudgetComponent,
    CreateBudgetComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
      NgApexchartsModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false}
        ),
        FormsModule,
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
