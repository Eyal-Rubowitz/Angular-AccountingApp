import {Component, OnInit, NgModule} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Participant } from "../participant";

import { Observable } from 'rxjs/Observable';
import { MemberService } from '../../services/member.service';


@Component({
    selector: 'edit-member',
    templateUrl: './edit-member.component.html',
    styleUrls: []
  })

  export class EditMemberComponent implements OnInit{
    form: FormGroup;
    public memberId : string;
    constructor(private memberService: MemberService, 
                private route: ActivatedRoute, 
                private fb: FormBuilder,
                private router: Router
            ){
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
        this.memberService.getMember(this.memberId).subscribe(m => {
            this.form.patchValue(m)
        });
   }
   
    saveMember(){
        if(this.form.valid){
            this.memberService
                .updateMember(
                    this.memberId, 
                    this.form.value)
                    .then(r => {
                        // transaction was updated, 
                        // can now redirect to "/members" path
                        this.router.navigateByUrl('/members');
            })   
        }
    }
}
