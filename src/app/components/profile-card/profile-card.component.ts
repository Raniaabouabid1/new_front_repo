import { Component } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  imports: [
    SidebarComponent
  ],
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  user = {
    firstName: 'Sienna',
    lastName: 'Hewitt',
    email: 'siennahewitt@gmail.com',
    country: '🇺🇸 United States',
    username: 'siennahewitt'
  };

  saveChanges() {
    console.log('Changes saved:', this.user);
    alert('Profile updated successfully!');
  }

  archiveUser() {
    console.log('User archived:', this.user);
    alert('User has been archived.');
  }
}
