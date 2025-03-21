import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-users-pagination',
  standalone: true,
  templateUrl: './users-pagination.component.html',
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./users-pagination.component.css']
})
export class UsersPaginationComponent {
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number): void {
    this.pageChange.emit(page); // ✅ Notify parent component
  }
}
