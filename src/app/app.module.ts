import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { Route } from '@angular/router/src/config';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage'; // library use for manage images with FireDB

import { environment } from '../environments/environment.prod';

import { Participant } from './participant/participant';
import { Transaction } from './transactions/transaction';


import { AppComponent } from './app.component';
import { MembersComponent } from './participant/members.component/members.component';
import { EditMemberComponent } from './participant/edit-member/edit-member.component';
import { MemberInfoComponent } from './participant/member-info/member-info.component';
import { TransactionComponent } from './transactions/transaction.component/transaction.component';
import { TransactionInfoComponent } from './transactions/transaction-info/transaction-info.component';
import { SummaryComponent } from './summary/summary.component/summary.component';
import { PageNotFoundComponent } from '../app/app-components/page-not-found.component/page-not-found.component';

import { appRoutes } from '../app/app-routing.module/app-routing.module';
import { DocPipe } from '../app/pipes/doc.pipe';
import { MinDirective } from '../app/directives/validators/min.directive';
import { MemberService } from './services/member.service';
import { TransactionService } from './services/transaction.service';
import { DropZoneDirective } from './drop-zone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';

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
    MemberInfoComponent,
    TransactionInfoComponent,
    DropZoneDirective,
    FileUploadComponent
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
