import {Component, OnInit, NgModule} from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Transaction } from '../transaction';
import { Participant } from '../../participant/participant';

@Component({
    selector: 'transactions',
    templateUrl: './transaction.component.html',
    styleUrls: []
  })

  export class TransactionComponent implements OnInit{
    transactions : Transaction[];
    newTransaction : Transaction;
    members : Participant[];

    constructor(){
       this.newTransaction = new Transaction('', '', 0, new Participant('', '', '', ''), new Participant('', '', '', ''), new Date(2000, 1, 1), false, null);
    }
    ngOnInit() {
        this.members = [
         new Participant("camp UnBirthday", "00-0000000", "UnBirthday@burn.fun", 0),
         new Participant("Chashmelator Electro Wizard", "00-000?000", "HesMail", 0),
        ]
        this.transactions =[
        new Transaction("Electricity suplay", 
        "Outer service",
        3500, 
        this.members[0],
        this.members[1],
        new Date(2018,5,11),
        false,
        null)
        ,
        
        new Transaction("Partial prepay camp fee", 
        "Camp initial money collect",
        250, 
        this.members[2],
        this.members[0],
        new Date(2017,12,9),
        true,
        null)];
    }
   
  }