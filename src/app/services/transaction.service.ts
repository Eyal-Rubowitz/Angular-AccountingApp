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

   getTransaction(transactionId : string){
    return this.db.doc<Transaction>(`transactions/${transactionId}`).valueChanges();
  }

   addTransaction(transaction : any) {
    //var data = JSON.parse(JSON.stringify(transaction));
    this.transactionsSource.add(transaction);
  }

  updateTransaction(transactionId : string, newValues: Object){
    let transaction = this.db.doc<Transaction>(`transactions/${transactionId}`);
    debugger;
    return transaction.update(newValues);
   }

  removeTransaction(transaction : Transaction){
    this.db.doc<Transaction>(`transactions/${transaction.id}`).delete();
  }
}