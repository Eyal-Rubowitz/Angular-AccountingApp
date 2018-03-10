import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { MembersComponent } from '../participant/members.component/members.component';
import { TransactionComponent } from '../transactions/transaction.component/transaction.component';
import { PageNotFoundComponent } from '../app-components/page-not-found.component/page-not-found.component';
import { EditMemberComponent } from '../participant/edit-member/edit-member.component';
import { SummaryComponent } from '../summary/summary.component/summary.component'
import { MemberInfoComponent } from '../participant/member-info/member-info.component';

import { Route } from '@angular/router/src/config';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/members',
        pathMatch: 'full'
    },
    {
        path: 'members',
        component: MembersComponent
    },
    {
        path: 'member/:id/edit',
        component: EditMemberComponent
    },
    {
        path: 'transactions',
        component: TransactionComponent
    },
    {
        path: 'summary',
        component: SummaryComponent
    },
    {
        path: 'member/:id/info',
        component: MemberInfoComponent
    },
    {
        path: '**', 
        component: PageNotFoundComponent 
    }
    
]