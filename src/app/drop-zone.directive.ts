import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();
  
  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event){
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer);
    this.hovered.emit(false);
    }

    
}
