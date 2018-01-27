import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { Route } from '@angular/router/src/config';

import { Participant } from './participant/participant';
import { Transaction } from './transactions/transaction';

import { AppComponent } from './app.component';
import { MembersComponent } from './participant/members.component/members.component';
import { TransactionComponent } from './transactions/transaction.component/transaction.component';
import { PageNotFoundComponent } from '../app/app-components/page-not-found.component/page-not-found.component';
import { appRoutes } from '../app/app-routing.module/app-routing.module';
// const appRoutes: Routes = [
//   {
//     path: 'members', 
//     component: MembersComponent
//   },
//   {
//     path: 'transactions', 
//     component: TransactionComponent
//   },
//   // {
//   //   path: 'member-transactions', 
//   //   component: TransactionComponent
//   // },
//   // {
//   //   path: 'camp-members', 
//   //   component: MembersComponent
//   // },
//   {
//     path: '**', 
//     component: PageNotFoundComponent 
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    TransactionComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
