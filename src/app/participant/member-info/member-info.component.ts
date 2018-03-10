import { Component, OnInit, NgModule } from '@angular/core';
import { Participant } from '../participant';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import { scan, map  } from 'rxjs/operators'

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../transactions/transaction';
import { retry } from 'rxjs/operators/retry';

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
          // filter(function(grr) {
          //   return grr.filter(function(t){ return true }) ;
          // }).
          map(function(t){
            return t.map(function(transaction) { 
              if((transaction.whosPaying as any).id == memberId){
                  return -transaction.amount;
              }else if((transaction.whosReciving as any).id == memberId){
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