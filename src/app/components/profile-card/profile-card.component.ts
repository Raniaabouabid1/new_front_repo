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
    NgIf
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
  emailError : String = '';
  phoneError: string = '';
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;



  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.userId = decoded.sub;

        this.http.get(`http://localhost:8080/api/profile/${this.userId}`)
          .subscribe({
            next: data => {
              this.user = data;
              this.loadProfileImage();
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

    if (this.newPassword && this.confirmPassword) {
      payload.password = this.newPassword;
    }


    this.http.patch(`http://localhost:8080/api/profile/${this.userId}`, payload)
      .subscribe({
        next: (response) => {
          this.editMode = false;
          this.newPassword = '';
          this.confirmPassword = '';
          this.emailError = '';
          this.phoneError = '';
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 30000);
        },
        error: (error) => {
          console.error('Failed to update user:', error);
          this.showErrorAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 30);
          if (error.status === 409 && error.error) {
            const errorMessage: string = error.error;
            if (errorMessage.toLowerCase().includes('email')) {
              this.emailError = errorMessage;
              this.phoneError = '';
            } else if (errorMessage.toLowerCase().includes('phone')) {
              this.phoneError = errorMessage;
              this.emailError = '';
            } else {
              this.emailError = errorMessage;
              this.phoneError = '';
            }
          } else {
            this.emailError = 'Email format is invalid.';
            this.phoneError = '';
          }

          this.showSuccessAlert = false;
        }
      });

}

  uploadProfileImage(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    this.http.put(`http://localhost:8080/api/profile/${this.userId}/profile-image`, formData, { responseType: 'text' }) // Expect text response
      .subscribe({
        next: (response) => {
          this.loadProfileImage();
        },
        error: (error) => console.error("Error uploading image:", error)
      });
  }

  loadProfileImage(): void {
    this.http.get(`http://localhost:8080/api/profile/${this.userId}/profile-image`, { responseType: 'blob' })
      .subscribe({
        next: (imageBlob) => {
          // If the image is empty (0 bytes), treat it as no image
          if (imageBlob.size === 0) {
            this.user.profileImage = "/avatar.svg";
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            this.user.profileImage = reader.result as string;
          };
          reader.readAsDataURL(imageBlob);
        },
        error: (error) => {
          // Instead of logging the error, just fallback silently
          this.user.profileImage = "/avatar.svg";
        }
      });
  }


}
