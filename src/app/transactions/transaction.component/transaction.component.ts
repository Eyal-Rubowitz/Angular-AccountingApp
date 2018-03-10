import {Component, OnInit, NgModule, transition, Renderer2, ViewChild, ElementRef} from '@angular/core';
import {FormsModule, FormGroup } from '@angular/forms';

import { Transaction } from '../transaction';
import { Participant } from '../../participant/participant';

import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
//////import 'rxjs/add/operator/map';
import { MinDirective } from '../../directives/validators/min.directive';

import { MemberService } from '../../services/member.service';
import { TransactionService } from '../../services/transaction.service';
import { TransactionType } from '../transaction-type.enum';

@Component({
    selector: 'transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
  })

export class TransactionComponent implements OnInit{
//  private transactionsSource: AngularFirestoreCollection<Transaction>;
  transactions : Observable<Transaction[]>;
  newTransaction : Transaction;
  members : Observable<Participant[]>;
  @ViewChild('transactionForm', {read: ElementRef}) myForm: ElementRef;
  submitted : boolean;
  typeOption: string[];
  
  constructor(private db: AngularFirestore, private transactionService: TransactionService, private memberService: MemberService){
     this.newTransaction = new Transaction('', undefined, '', 0, undefined, undefined, new Date(), false, null);
  }
  
  ngOnInit() {
    this.typeOption = Object.keys(TransactionType);
    this.typeOption = this.typeOption.slice(this.typeOption.length / 2);
    this.transactions = this.transactionService.getTransactions();
    this.members = this.memberService.getMembers();      
  }
  
  addTransaction() {
    //this.newTransaction.itemType = this.typeOption[data.itemType];
    var data: any;
   // this.newTransaction.itemType = TransactionType[ value];
    data = JSON.parse(JSON.stringify(this.newTransaction as Object));
    data.whosPaying = this.memberService.getReference(data.whosPaying);
    data.whosReciving = this.memberService.getReference(data.whosReciving);
    
    const formElement = this.myForm.nativeElement;
    this.submitted = true;
    
    if(formElement.checkValidity()){
      this.transactionService.addTransaction(data);
      // reset form completely
      formElement.reset();
      this.newTransaction = new Transaction('', undefined, '', 0,'', '', new Date(), false, null);
      this.submitted = false;
    }
  }
  
  removeTransaction(transaction : Transaction){
    this.transactionService.removeTransaction(transaction);
  }
  
  // removeTransaction(transaction: Transaction){
  //   this.db.doc<Transaction>(`transactions/${transaction.id}`).delete();
  

      // foobar(foo){
      //   debugger;
      //   console.log(foo);
      // }

        // this.members = [
        //  new Participant("camp UnBirthday", "00-0000000", "UnBirthday@burn.fun", 0),
        //  new Participant("Chashmelator Electro Wizard", "00-000?000", "HesMail", 0),
        //  new Participant("Eyal Robowitz", "050-6599358", "g@mail.com", 0),
        // ]
        // this.transactions =[
        // new Transaction("Electricity suplay", 
        // "Outer service",
        // 3500, 
        // this.members[0],
        // this.members[1],
        // new Date(2018,5,11),
        // false,
        // null)
        // ,
        
        // new Transaction("Partial prepay camp fee", 
        // "Camp initial money collect",
        // 250, 
        // this.members[1],
        // this.members[0],
        // new Date(2017,12,9),
        // true,
        // null)];
    
        // selectIsExecute(event: boolean){
          
        // }
}
  