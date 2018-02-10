import {Component, OnInit, NgModule} from '@angular/core';
//import {FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Participant } from "../participant";

import { AngularFirestore, AngularFirestoreDocument  } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

//import 'rxjs/add/operator/map';

@Component({
    selector: 'edit-member',
    templateUrl: './edit-member.component.html',
    styleUrls: []
  })

  export class EditMemberComponent implements OnInit{
    form: FormGroup;
    public member : AngularFirestoreDocument<Participant>;
    public memberId : string;
    constructor(private db: AngularFirestore, private route: ActivatedRoute,private fb: FormBuilder){
        this.form = this.fb.group({
            name: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: [0, Validators.required],
            memberBalance: [0, Validators.required],
            memberFee: [0, Validators.required],
            isMemberFeePaid: [false, Validators.required],
            totalExpenses: [0, Validators.required]
        });
    } 

    ngOnInit(): void {
        this.memberId = this.route.snapshot.paramMap.get('id');
        this.member = this.db.doc<Participant>(`members/${this.memberId}`);
        this.member.valueChanges().subscribe(m => {
            this.form.patchValue(m)
        });

    }

    saveMember(){
         this.member.update(this.form.value).then(r => {
            // member was updated, can now redirect to /members path
        });     
    }
  }
