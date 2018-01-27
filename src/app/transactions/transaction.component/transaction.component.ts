import {Component, OnInit, NgModule} from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Transaction } from '../transaction';
import { Participant } from '../../participant/participant';

import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { debug } from 'util';

@Component({
    selector: 'transactions',
    templateUrl: './transaction.component.html',
    styleUrls: []
  })

  export class TransactionComponent implements OnInit{
    private transactionsSource: AngularFirestoreCollection<Transaction>;
    transactions : Observable<Transaction[]>;
    newTransaction : Transaction;
    members : Participant[];

    constructor(private db: AngularFirestore){
       this.newTransaction = new Transaction('', '', 0, new Participant('', '', ''), new Participant('', '', ''), new Date(2000, 1, 1), false, null);
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
    }
      foobar(foo){
        debugger;
        console.log(foo);
      }
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
    
   
  }