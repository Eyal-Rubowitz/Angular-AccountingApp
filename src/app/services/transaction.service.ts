import { Transaction } from '../transactions/transaction';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {
  private transactionsSource: AngularFirestoreCollection<Transaction>;
  //private transactions : Observable<Transaction[]>; //Participant[];
  
  constructor(private db: AngularFirestore) {
    this.transactionsSource = this.db.collection<Transaction>('transactions');
  }

  getTransactions(){
    return this.transactionsSource.snapshotChanges().map( actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Transaction;
          const id = a.payload.doc.id;
          return {id, ...data}
      })
    });
   }

   addTransaction(transaction : Object) {
    var data = JSON.parse(JSON.stringify(transaction));
    this.transactionsSource.add(data);
  }

  removeTransaction(transaction : Transaction){
    this.db.doc<Transaction>(`transactions/${transaction.id}`).delete();
  }
}