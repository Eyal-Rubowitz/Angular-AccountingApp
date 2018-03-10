import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { Route } from '@angular/router/src/config';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Participant } from './participant/participant';
import { Transaction } from './transactions/transaction';
import { SummaryComponent } from './summary/summary.component/summary.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { AppComponent } from './app.component';
import { MembersComponent } from './participant/members.component/members.component';
import { TransactionComponent } from './transactions/transaction.component/transaction.component';
import { PageNotFoundComponent } from '../app/app-components/page-not-found.component/page-not-found.component';
import { EditMemberComponent } from './participant/edit-member/edit-member.component';

import { appRoutes } from '../app/app-routing.module/app-routing.module';
import { environment } from '../environments/environment.prod';
import { DocPipe } from '../app/pipes/doc.pipe';
import { MinDirective } from '../app/directives/validators/min.directive';
import { MemberService } from './services/member.service';
import { TransactionService } from './services/transaction.service';
import { MemberInfoComponent } from './participant/member-info/member-info.component';

// import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

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
    SummaryComponent,
    PageNotFoundComponent,
    DocPipe,
    EditMemberComponent,
    MinDirective,
    MemberInfoComponent
    // MultiselectDropdownModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [MemberService, TransactionService],
  bootstrap: [AppComponent]
})

export class AppModule { }
