import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode'; // Correct default import
import {NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass,
    FormsModule,
    NgIf,
    // Import FormsModule for ngModel
  ],
  standalone: true
})
export class ProfileCardComponent implements OnInit {
  editMode: boolean = false;
  user: any = {};
  userId: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.userId = decoded.sub;
        console.log('Extracted user ID from token:', this.userId);
        this.http.get(`http://localhost:8080/api/users/${this.userId}`)
          .subscribe({
            next: data => {
              this.user = data;
              this.loadProfileImage(); // Load profile image after user data
            },
            error: err => {
              console.error('Error fetching user data:', err);
            }
          });
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.error('No JWT token found in localStorage.');
    }
  }

  toggleEditMode() {
    if (this.editMode) {
      // Check if passwords are entered
      if (this.newPassword || this.confirmPassword) {
        if (this.newPassword !== this.confirmPassword) {
          this.passwordMismatch = true;
          return;
        } else {
          this.passwordMismatch = false;
        }
      }
    }

    this.editMode = !this.editMode;
  }
  validatePasswords() {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
  }
  saveChanges(): void {
    if (this.newPassword && this.confirmPassword) {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }
      this.passwordMismatch = false;
    }

    const payload: any = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      birthDate: this.user.birthDate,
    };

    // Include password only if provided
    if (this.newPassword && this.confirmPassword) {
      payload.password = this.newPassword;
    }

    console.log("Sending update request:", payload); // ✅ Debugging line

    this.http.patch(`http://localhost:8080/api/users/${this.userId}`, payload)
      .subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.editMode = false;
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (error) => {
          console.error('Failed to update user:', error);
        }
      });
  }

  uploadProfileImage(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    this.http.put(`http://localhost:8080/api/users/${this.userId}/profile-image`, formData, { responseType: 'text' }) // Expect text response
      .subscribe({
        next: (response) => {
          console.log("Profile image updated successfully:", response);
          this.loadProfileImage(); // Refresh image
        },
        error: (error) => console.error("Error uploading image:", error)
      });
  }


// Fetch profile image
  loadProfileImage(): void {
    this.http.get(`http://localhost:8080/api/users/${this.userId}/profile-image`, { responseType: 'blob' })
      .subscribe({
        next: (imageBlob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.user.profileImage = reader.result as string;
          };
          reader.readAsDataURL(imageBlob);
        },
        error: () => {
          console.log("No profile image found, using default.");
          this.user.profileImage = "/avatar.svg";
        }
      });
  }


}
