import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgIf} from "@angular/common";
import {Section} from '../sections/sections.component.service';

@Component({
  selector: 'app-section-delete-modal',
    imports: [
        NgIf
    ],
  templateUrl: './section-delete-modal.component.html',
  styleUrl: './section-delete-modal.component.css'
})
export class SectionDeleteModalComponent {

  @Input() section: Section | null = null;
  @Input() show: boolean = false;

  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmDelete.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
