import {Component, OnInit, NgModule, transition, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {FormsModule, FormGroup } from '@angular/forms';
import { Transaction } from '../transaction';
import { Participant } from '../../participant/participant';
import { MinDirective } from '../../directives/validators/min.directive';

import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { debug } from 'util';
import { Validators } from '@angular/forms/src/validators';
import { NgIf } from '@angular/common';
import { MemberService } from '../../services/member.service';
//import { ViewChild } from '@angular/core/src/metadata/di';


@Component({
    selector: 'transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
  })

  export class TransactionComponent implements OnInit{
    private transactionsSource: AngularFirestoreCollection<Transaction>;
    transactions : Observable<Transaction[]>;
    newTransaction : Transaction;
    //private membersSource: AngularFirestoreCollection<Transaction>;    
    members : Observable<Participant[]>;
    @ViewChild('form') myForm: ElementRef;
    submitted : boolean;
    // isExecuteOptions: boolean[];
    

    constructor(private db: AngularFirestore, private memberService: MemberService){
       this.newTransaction = new Transaction('', '', 0, undefined, undefined, new Date(), false, null);
    }
    
    ngOnInit() {
      this.transactionsSource = this.db.collection<Transaction>('transactions');
      this.transactions = this.transactionsSource.snapshotChanges().map( actions => {
          return actions.map(a => {
              const data = a.payload.doc.data() as Transaction;
              const id = a.payload.doc.id;
              return {id, ...data}
          })
        });
        
        this.members = this.memberService.getMembers();

      // Validators.required,
      // Validators.minLength(2);
    }

    addTransaction(foobar) {
      var data = JSON.parse(JSON.stringify(this.newTransaction));
      data.whosPaying = this.db.doc(`members/${data.whosPaying}`).ref;
      data.whosReciving = this.db.doc(`members/${data.whosReciving}`).ref;
      const formElement = this.myForm.nativeElement;
      this.submitted = true;

      if(formElement.checkValidity()){
        this.transactionsSource.add(data); // add transaction
        // reset form completely
        formElement.reset();
        this.newTransaction = new Transaction('', '', 0,'', '', new Date(), false, null);
        this.submitted = false;
      }

  }

  removeTransaction(transaction: Transaction){
    this.db.doc<Transaction>(`transactions/${transaction.id}`).delete();
  }

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