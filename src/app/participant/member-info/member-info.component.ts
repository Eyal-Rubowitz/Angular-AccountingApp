import { Component, OnInit, NgModule } from '@angular/core';

import { Participant } from '../participant';
import { Transaction } from '../../transactions/transaction';

import { MemberService } from '../../services/member.service';
import { TransactionService } from '../../services/transaction.service';

import { DocumentReference } from '@firebase/firestore-types';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { scan, map  } from 'rxjs/operators'
//import 'rxjs/add/operator/map';


@Component({
    selector: 'member-info',
    templateUrl: './member-info.component.html',
    styleUrls: []
  })

  
  export class MemberInfoComponent {
    public member: Observable<Participant>;
    public balance: Observable<number>;

    constructor(private memberService: MemberService, private transactionService: TransactionService, private route: ActivatedRoute){}
      ngOnInit(): void {
        var memberId = this.route.snapshot.paramMap.get('id');
        this.member = this.memberService.getMember(memberId);        
        this.balance = this.transactionService.getTransactions().
          map(function(t){
            return t.map(function(transaction) { 
              if((transaction.whosPaying as DocumentReference).id == memberId){
                  return -transaction.amount;
              }else if((transaction.whosReciving as DocumentReference).id == memberId){
                return transaction.amount;
            } else {
                return 0;
              } 
            });
          }).scan(function(s,m){
            return m.reduce(function(ss,i){ return i + ss })
          },0)
    }
  }