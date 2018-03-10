import { Component, OnInit, transition } from '@angular/core';
import { Transaction } from '../../transactions/transaction';
import { Participant } from '../../participant/participant';

import { Observable } from 'rxjs/Observable';
import { scan, map  } from 'rxjs/operators'

import { MemberService } from '../../services/member.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
    selector: 'summary',
    templateUrl: './summary.component.html',
    styleUrls: []
})

export class SummaryComponent implements OnInit{
   
    members: Observable<Participant[]>;
    transactions: Observable<Transaction[]>;
    sumTransactions: number;
    public totalMembersFee;
    
    constructor(private transactionService: TransactionService, private memberService: MemberService){}

    ngOnInit() {
        this.members = this.memberService.getMembers();
        this.transactions = this.transactionService.getTransactions();
        console.log(this.totalMembersFee);

        this.totalMembersFee = this.memberService.sumMemberBy(function(m){ return m.memberFee });

    }

    

}
