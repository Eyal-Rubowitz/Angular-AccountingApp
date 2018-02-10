import {Component, OnInit, NgModule} from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Participant } from "../participant";

import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: []
  })
  
export class MembersComponent implements OnInit {
    private membersSource: AngularFirestoreCollection<Participant>;
    public members : Observable<Participant[]>; //Participant[];
    public newMember : Object; //Participant;
    
    constructor(private db: AngularFirestore){
        this.newMember = new Participant('','','',0);
    }


    ngOnInit() {
        // this.members = [
        //     new Participant('El-Nakem Israel', '05004040202', 'El@Nekam.gov',0),
        //     new Participant('Miri Regev', '0547744352', 'Miri@Nikolodeon.regev',0)
        // ];
        this.membersSource = this.db.collection<Participant>('members');
        this.members = this.membersSource.snapshotChanges().map( actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Participant;
                const id = a.payload.doc.id;
                return {id, ...data}
            })
        });
        //this.members = this.db.list('/members').valueChanges();
        //this.recipes = this.recepieService.getRecepies();
      }

      addMember() {
          var data = JSON.parse(JSON.stringify(this.newMember));
          this.membersSource.add(data);
          this.newMember = new Participant();
      }

      removeMember(member : Participant){
        this.db.doc<Participant>(`members/${member.id}`).delete();
      }

      setFeeMembers(fee:number){
        this.members.forEach(members => {
            members.forEach(m => {
                m.memberFee = fee;
            })
       });
    }
}