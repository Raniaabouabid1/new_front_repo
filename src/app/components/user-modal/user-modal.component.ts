import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  imports: [
    NgIf,
    FormsModule
  ],
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onClose(): void {
    this.close.emit();
  }

  onSubmit(formData: any): void {
    this.save.emit(formData);
  }

}
