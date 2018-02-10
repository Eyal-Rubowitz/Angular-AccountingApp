import {Component, OnInit, NgModule} from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Participant } from "../participant";

import { Observable } from 'rxjs/Observable';
import { MemberService } from '../../services/member.service';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: []
  })
  
export class MembersComponent implements OnInit {
    public members : Observable<Participant[]>; //Participant[];
    public newMember : Object; //Participant;
    
    constructor(private memberService: MemberService){
        this.newMember = new Participant('','','',0);
    }


    ngOnInit() {
        this.members = this.memberService.getMembers();
        //this.members = this.db.list('/members').valueChanges();
        //this.recipes = this.recepieService.getRecepies();
      }

      addMember() {
          this.memberService.addMember(this.newMember);
          this.newMember = new Participant();
      }

      removeMember(member : Participant){
        this.memberService.removeMember(member);
      }

      setFeeMembers(fee:number){
        this.members.forEach(members => {
            members.forEach(m => {
                m.memberFee = fee;
            })
       });
    }
}