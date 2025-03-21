import { Component, OnInit } from '@angular/core';
import { UserService } from './users.component.service';  // Correct service import
import { IUser } from './users.component.service';
import {DatePipe, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from '@angular/common';
import {DeleteUserModalComponent} from '../delete-user-modal/delete-user-modal.component';
import {FormsModule} from '@angular/forms';
import {UserModalComponent} from '../user-modal/user-modal.component';
import {UsersPaginationComponent} from '../users-pagination/users-pagination.component';

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
    UsersPaginationComponent,
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
  showUserModal: boolean = false;
  modalMode: 'add' | 'view' | 'edit' = 'add';
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;



  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers(); // load users initially without filters
  }
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }


  openUserModal(): void {
    // When adding a user, set mode to 'add' and clear selectedUser.
    this.modalMode = 'add';
    this.selectedUser = null;
    this.showUserModal = true;
  }

  openViewModal(user: IUser): void {
    this.modalMode = 'view';
    this.selectedUser = user;
    this.showUserModal = true;
  }
  openEditModal(user: IUser): void {
    this.modalMode = 'edit';
    this.selectedUser = user;
    this.showUserModal = true;
  }



  closeUserModal(): void {
    this.showUserModal = false;
  }

  handleSave(formData: IUser): void {
    if (this.modalMode === 'add') {
      this.userService.addUser(formData).subscribe(
        (response: IUser) => {
          this.users.push(response);
          this.closeUserModal();
        },
        error => { console.error('Error adding user', error); }
      );
    } else if (this.modalMode === 'edit') {
      this.userService.updateUser(formData).subscribe(
        (response: IUser) => {
          const index = this.users.findIndex(u => u.id === response.id);
          if (index > -1) {
            this.users[index] = response;
          }
          this.closeUserModal();
        },
        error => { console.error('Error updating user', error); }
      );
    }

}

  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.pageSize, this.fullName, this.role, this.searchEmail)
      .subscribe((data: any) => {
        this.users = data.content;
        this.totalPages = data.totalPages;
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



