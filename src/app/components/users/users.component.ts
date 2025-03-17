import { Component, OnInit } from '@angular/core';
import { UserService } from './users.component.service';  // Correct service import
import { IUser } from './users.component.service';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import {DeleteUserModalComponent} from '../delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [
    NgClass,
    NgForOf,
    DatePipe,
    DeleteUserModalComponent
  ],
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  selectedUser: IUser | null = null;
  showDeleteModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Load the users from your backend
    this.userService.getUsers().subscribe((data: IUser[]) => {
      this.users = data;
    });
  }

  // Triggered by clicking the delete button in the table
  openDeleteModal(user: IUser): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  // Hide the modal
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  // Called when user confirms deletion
  confirmDelete(): void {
    if (!this.selectedUser) {
      return;
    }
    // Call service to delete the user
    this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
      // Refresh the list or remove user from 'users' array
      this.users = this.users.filter(u => u.id !== this.selectedUser?.id);

      // Close the modal
      this.closeDeleteModal();
    });
  }
}
