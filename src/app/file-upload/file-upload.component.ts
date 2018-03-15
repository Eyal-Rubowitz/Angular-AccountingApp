import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage' 
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  // Main task - the object that gives eccess to the observable data 
  // and allow to pause, cancel or zoom & upload
  // it's realy usefule for using progress bar 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;
  
  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  
  constructor(event: boolean) {
    this.isHovering = event;
   }

  ngOnInit() {
  }

  startUpload(event: FileList){
    // the file object
    const file = event.item(0)
  
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image'){
      console.error('unsupported file type :(')
    }
    
    // The storage path - tells FireBase where to save the file.
    // it's a good idea to give a uniqe identify by Date & File name as below 
    // for prevent collisions
    const path = `test/${new Date().getDate()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My Angular Firebase image'};
  
    // The main task - storage property 'storage' is declared at the firebase service
    //////// this.task = this.storage.upload(path, file, { customMetadata});
    // ???????    ?     ?????????

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    //the file's download URL
    this.downloadURL = this.task.downloadURL();

  }
  // Determintes if the upload task is active
  // isActive(snapshot){
  //   return snapshot.state === 'running' && this.snapshot.bytesTransferred <snapshot.totalBytes>
  // }        ????????   ?   ????????

}
