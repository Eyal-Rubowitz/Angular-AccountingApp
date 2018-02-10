import { Participant } from '../participant/participant';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberService {
  private membersSource: AngularFirestoreCollection<Participant>;
  private members : Observable<Participant[]>; //Participant[];
  
  constructor(private db: AngularFirestore) {
    this.membersSource = this.db.collection<Participant>('members');
    this.members =  this.membersSource.snapshotChanges().map( actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Participant;
          const id = a.payload.doc.id;
          return {id, ...data}
      })
    });
  }

   getMembers(){
    return this.members;
   }

   getMember(memberId : string){
     return this.db.doc<Participant>(`members/${memberId}`).valueChanges();
   }

   updateMember(memberId : string, newValues: Object){
    let member = this.db.doc<Participant>(`members/${memberId}`);
    return member.update(newValues);
   }

   addMember(member : Object) {
    var data = JSON.parse(JSON.stringify(member));
    this.membersSource.add(data);
  }

  removeMember(member : Participant){
    this.db.doc<Participant>(`members/${member.id}`).delete();
  }
}
