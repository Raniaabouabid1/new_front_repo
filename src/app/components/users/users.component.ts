import { Component, OnInit } from '@angular/core';
import { UserService } from './users.component.service';  // Correct service import
import { IUser } from './users.component.service';
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from '@angular/common';
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
    NgIf,
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
  showSuccessAddAlert : boolean = false;
  showErrorAddAlert : boolean = false;
  showSuccessDeleteAlert : boolean = false;
  showErrorDeleteAlert : boolean = false;



  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers();   }
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }


  openUserModal(): void {
    this.modalMode = 'add';
    this.selectedUser = null;
    this.showSuccessAddAlert = false;
    this.showErrorAddAlert = false;
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
          this.showSuccessAddAlert = true; // ✅ show success
          this.showErrorAddAlert = false;
          this.closeUserModal();
          setTimeout(() => this.showSuccessAddAlert = false, 4000); // auto-hide
        },
        error => {
          this.showErrorAddAlert = true; // ❌ show error
          this.showSuccessAddAlert = false;
          setTimeout(() => this.showErrorAddAlert = false, 4000); // auto-hide
        }
      );
    } else if (this.modalMode === 'edit') {
      this.userService.updateUser(formData).subscribe(
        (response: IUser) => {
          const index = this.users.findIndex(u => u.id === response.id);
          if (index > -1) this.users[index] = response;
          this.closeUserModal();
        },
        error => {
          console.error('Error updating user', error);
          this.showErrorAddAlert = true;
          setTimeout(() => this.showErrorAddAlert = false, 4000);
        }
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


  onSubmit(): void {
   this.loadUsers();
  }

  onReset(): void {
    this.fullName = '';
    this.searchEmail = '';
    this.role = '';
    this.role = '';
    this.loadUsers();
  }


  openDeleteModal(user: IUser): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  confirmDelete(): void {
    if (!this.selectedUser) return;

    this.userService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== this.selectedUser?.id);
        this.showSuccessDeleteAlert = true; // ✅
        this.showErrorDeleteAlert = false;
        this.closeDeleteModal();
        setTimeout(() => this.showSuccessDeleteAlert = false, 4000);
      },
      error: (err) => {
        console.error("❌ Error deleting user", err);
        this.showErrorDeleteAlert = true;
        this.showSuccessDeleteAlert = false;
        this.closeDeleteModal();
        setTimeout(() => this.showErrorDeleteAlert = false, 4000);
      }
    });
  }

}



