import { Participant } from '../participant/participant';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberService {
  private membersSource: AngularFirestoreCollection<Participant>;
  //private members : Observable<Participant[]>; //Participant[];

  constructor(private db: AngularFirestore) {
    this.membersSource = this.db.collection<Participant>('members');
  }

   getMembers(){
    return this.membersSource.snapshotChanges().map( actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Participant;
          const id = a.payload.doc.id;
          return {id, ...data}
      })
    });
   }

   getMember(memberId : string){
     return this.db.doc<Participant>(`members/${memberId}`).valueChanges();
   }

   getReference(memberId: string){
    return this.db.doc(`members/${memberId}`).ref;
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
      
  sumMemberBy(func: (v: Participant)=>any): Observable<number>  {
    return this.getMembers().
      map(function(ma){ return ma.map(func) }).
      scan(function(s,m){ 
          return m.reduce(function(ss,i){ return i + ss })
      },0)
  }

}
