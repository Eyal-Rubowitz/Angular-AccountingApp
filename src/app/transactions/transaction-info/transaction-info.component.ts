import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Transaction } from '../transaction';

import { Observable } from 'rxjs/Observable';
import { TransactionService } from '../../services/transaction.service';
import { DocumentReference } from '@firebase/firestore-types';
import { scan, map } from 'rxjs/operators'

@Component({
    selector: 'transaction-info',
    templateUrl: './transaction-info.component.html',
    styleUrls: []
})

export class TransactionInfoComponent implements OnInit{
    form: FormGroup;
    public transactionId: string;
    constructor(private transactionService: TransactionService,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router
            ){ 
            this.form = this.fb.group({
            paymentDescription: [''],
            billPicture: ['']
        });
    }

    ngOnInit(): void {
        this.transactionId = this.route.snapshot.paramMap.get('id');
        this.transactionService.getTransaction(this.transactionId).subscribe(t => {
            this.form.patchValue(t)
        });
    }

    saveTransactionInfo() {
        if (this.form.valid) {
            this.transactionService
                .updateTransaction(
                    this.transactionId, 
                    this.form.value)
                    .then(r => {
                    // transaction was updated, 
                    // can now redirect to "/transactions" path
                    this.router.navigateByUrl('/transactions')
            })
        }
    }
}
