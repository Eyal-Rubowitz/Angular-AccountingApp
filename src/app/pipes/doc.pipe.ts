import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  constructor(private db: AngularFirestore) {}

  transform(value: any): Observable<any> {
    return this.db.doc(value.path).valueChanges();
  }

}
