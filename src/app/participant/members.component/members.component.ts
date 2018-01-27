import {Component, OnInit, NgModule} from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Participant } from "../participant";

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: []
  })
export class MembersComponent implements OnInit {
    public members : Participant[];
    public newMember : Participant;
    constructor(){
        this.newMember = new Participant('','','',0);
    }


    ngOnInit() {
        this.members = [
            new Participant('El-Nakem Israel', '05004040202', 'El@Nekam.gov',0),
            new Participant('Miri Regev', '0547744352', 'Miri@Nikolodeon.regev',0)
        ];
        //this.recipes = this.recepieService.getRecepies();
      }

      addMember() {
          this.members.push(this.newMember);
          this.newMember = new Participant();
      }

      removeMember(member : Participant){
        this.members = this.members.filter(m => m !== member)
      }

    setFeeMembers(fee:number){
        this.members.forEach(member => {
           member.memberFee = fee;
       });
    }
}