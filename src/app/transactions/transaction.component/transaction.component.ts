import { Component, OnInit, NgModule, transition, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';

import { Transaction } from '../transaction';
import { Participant } from '../../participant/participant';

//import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
//////import 'rxjs/add/operator/map';
//import { MinDirective } from '../../directives/validators/min.directive';

import { MemberService } from '../../services/member.service';
import { TransactionService } from '../../services/transaction.service';
import { TransactionType } from '../transaction-type.enum';

@Component({
  selector: 'transactions',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  //  private transactionsSource: AngularFirestoreCollection<Transaction>;
  transactions: Observable<Transaction[]>;
  newTransaction: Transaction;
  members: Observable<Participant[]>;
  @ViewChild('transactionForm', { read: ElementRef }) myForm: ElementRef;
  submitted: boolean;
  typeOption: string[];

  constructor(private transactionService: TransactionService, private memberService: MemberService) {
    this.newTransaction = new Transaction('', undefined, '', 0, undefined, undefined, new Date(), false, null);
  }

  ngOnInit() {
    this.typeOption = Object.keys(TransactionType);
    this.typeOption = this.typeOption.slice(this.typeOption.length / 2);
    this.transactions = this.transactionService.getTransactions();
    this.members = this.memberService.getMembers();
  }

  addTransaction() {
    var data: any;
    data = JSON.parse(JSON.stringify(this.newTransaction as Object));
    data.whosPaying = this.memberService.getReference(data.whosPaying);
    data.whosReciving = this.memberService.getReference(data.whosReciving);

    const formElement = this.myForm.nativeElement;
    this.submitted = true;

    if (formElement.checkValidity()) {
      this.transactionService.addTransaction(data);
      // reset form completely
      formElement.reset();
      this.newTransaction = new Transaction('', undefined, '', 0, '', '', new Date(), false, null);
      this.submitted = false;
    }
  }

  removeTransaction(transaction: Transaction) {
    this.transactionService.removeTransaction(transaction);
  }
}
