import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Participant } from '../participant';

import { Observable } from 'rxjs/Observable';
import { MinDirective } from '../../directives/validators/min.directive';

import { MemberService } from '../../services/member.service';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: []
  })
  
export class MembersComponent implements OnInit {
    public members : Observable<Participant[]>; //Participant[];
    public newMember : Object; //Participant;
    @ViewChild('memberForm') myForm: ElementRef;
    
    constructor(private memberService: MemberService){
        this.newMember = new Participant('','','');
    }

    ngOnInit() {
        this.members = this.memberService.getMembers();
        //this.members = this.db.list('/members').valueChanges();
      }

      addMember() {
        var data = JSON.parse(JSON.stringify(this.newMember));
        const formElement = this.myForm.nativeElement;

        if(formElement.checkValidity()){
            this.memberService.addMember(data);
            // reset form completely
            formElement.reset();
            this.newMember = new Participant();
        }
      }

      removeMember(member : Participant){
        this.memberService.removeMember(member);
      }

    //   setFeeMembers(fee:number){
    //     this.members.forEach(members => {
    //         members.forEach(m => {
    //             m.memberFee = fee;
    //         })
    //    });
    // }
}