import { Component, OnInit } from '@angular/core';
import { UserService } from './users.component.service';  // Correct service import
import { IUser } from './users.component.service';
import {DatePipe, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from '@angular/common';
import {DeleteUserModalComponent} from '../delete-user-modal/delete-user-modal.component';
import {FormsModule} from '@angular/forms';
import {UserModalComponent} from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [
    NgForOf,
    DatePipe,
    DeleteUserModalComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    FormsModule,
    UserModalComponent,
    DeleteUserModalComponent,
  ],
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  selectedUser: IUser | null = null;
  showDeleteModal: boolean = false;
  fullName: string = '';
  searchEmail: string = '';
  role: string = '';

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers(); // load users initially without filters
  }

  showUserModal: boolean = false;

  openUserModal(): void {
    this.showUserModal = true;
  }

  closeUserModal(): void {
    this.showUserModal = false;
  }

  handleSave(formData: IUser): void {
    console.log('Saving user with data:', formData);
    this.userService.addUser(formData).subscribe(
      (response: IUser) => {
        // Optionally update your users list
        this.users.push(response);
        this.closeUserModal();
      },
      error => { console.error('Error adding user', error); }
    );
  }

  loadUsers(): void {
    const params = {
      fullName: this.fullName,
      searchEmail: this.searchEmail,
      role: this.role
    };

    this.userService.getUsers(params).subscribe((data: IUser[]) => {
      this.users = data;
    });
  }

  // Called on form submission
  onSubmit(): void {
    console.log('Selected role:', this.role);
    this.loadUsers();
  }

  // Optionally, implement reset functionality
  onReset(): void {
    this.fullName = '';
    this.searchEmail = '';
    this.role = '';
    this.role = '';
    this.loadUsers();
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



