import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { IUser } from '../users/users.component.service';


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
  @Input() mode: 'add' | 'view' | 'edit' = 'add';
  @Input() user: IUser | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onClose(): void {
    this.close.emit();
  }

  onSubmit(formData: any): void {
    if (this.mode !== 'view') {
      this.save.emit(formData);
    }

  }
}
