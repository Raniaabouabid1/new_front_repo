import { Component, Input, Output, EventEmitter } from '@angular/core';
import {IUser} from '../users/users.component.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-delete-user-modal',
  imports: [
    NgIf
  ],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.css'
})

export class DeleteUserModalComponent {
  @Input() user: IUser | null = null;
  @Input() show: boolean = false;

  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    // Emit the event that the user confirmed the deletion
    this.confirmDelete.emit();
  }

  onCancel(): void {
    // Emit the event that the user canceled the deletion
    this.cancel.emit();
  }
}

