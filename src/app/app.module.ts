import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { Route } from '@angular/router/src/config';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Participant } from './participant/participant';
import { Transaction } from './transactions/transaction';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { AppComponent } from './app.component';
import { MembersComponent } from './participant/members.component/members.component';
import { TransactionComponent } from './transactions/transaction.component/transaction.component';
import { PageNotFoundComponent } from '../app/app-components/page-not-found.component/page-not-found.component';
import { appRoutes } from '../app/app-routing.module/app-routing.module';
import { environment } from '../environments/environment.prod';
import { DocPipe } from '../app/pipes/doc.pipe';
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
    PageNotFoundComponent,
    DocPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
