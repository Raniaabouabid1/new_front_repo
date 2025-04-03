import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {SectionModalComponent} from '../section-modal/section-modal.component';
import {SectionDeleteModalComponent} from '../section-delete-modal/section-delete-modal.component';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    SectionModalComponent,
    SectionDeleteModalComponent
  ],
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections: any[] = [];
  isModalOpen = false;
  modalMode: 'add' | 'edit'| 'view' = 'add';
  showDeleteModal: boolean = false;
  sectionToDelete: any = null;

  selectedSection: any = {};
  allUsers: any[] = [];
  allCameras: any[] = [];

  currentPage = 0;
  totalPages = 0;
  name = '';
  coordinates = '';
  pageSize = 6;

  showSuccessAlert : boolean = false;
  showErrorAlert : boolean = false;
  showErrorAddAlert : boolean = false;
  showSuccessAddAlert : boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSections();
    this.loadUsers();
    this.loadCameras();
  }

  openDeleteModal(section: any): void {
    this.sectionToDelete = section;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.sectionToDelete = null;
  }

  toggleCamera(camId: string, event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (!this.selectedSection.cameraIds.includes(camId)) {
        this.selectedSection.cameraIds.push(camId);
      }
    } else {
      this.selectedSection.cameraIds = this.selectedSection.cameraIds.filter((id: string) => id !== camId);
    }
  }

  confirmDeleteSection(): void {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    this.http.delete(`http://localhost:8080/api/sections/${this.sectionToDelete.id}`,{headers}).subscribe({
      next: () => {
        this.fetchSections();
        this.showSuccessAlert = true;
        this.showDeleteModal = false; // only hide modal here
      },
      error: (error) => {
        this.showErrorAlert = true;
        console.error("❌ Error deleting section", error);
        this.showDeleteModal = false;
      }
    });
  }




  fetchSections(): void {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const params = new HttpParams()
      .set('page', this.currentPage)
      .set('size', this.pageSize)
      .set('name', this.name)
      .set('coordinates', this.coordinates);

    this.http.get<any>('http://localhost:8080/api/sections', { params,headers }).subscribe({
      next: (data) => {
        this.sections = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => console.error('Error loading sections:', err)
    });
  }

  onSearchSubmit(): void {
    this.currentPage = 0;
    this.fetchSections();
  }

  resetFilters(): void {
    this.name = '';
    this.coordinates = '';
    this.currentPage = 0;
    this.fetchSections();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.fetchSections();
  }
  openAddModal(): void {
    this.selectedSection = { name: '', coordinates: '', userIds: [], cameraIds: [] };
    this.modalMode = 'add';
    this.loadUsers();
    this.isModalOpen = true;
    this.loadCameras();
  }


  openEditModal(section: any): void {
    console.log("🛠️ Opening edit for section:", section);

    this.selectedSection = {
      id: section.id,
      name: section.name,
      coordinates: section.coordinates,
      userIds: section.users?.map((u: any) => u.id) || [],
      cameraIds: section.cameras?.map((c: any) => c.id) || []
    };

    this.modalMode = 'edit';
    this.loadUsers(section.id);
    this.loadCameras(section.id);
    this.isModalOpen = true;
  }



  openViewModal(section: any): void {
    this.selectedSection = {
      id: section.id,
      name: section.name,
      coordinates: section.coordinates,
      userIds: section.users?.map((u: any) => u.id) || [],
      cameraIds: section.cameras?.map((c: any) => c.id) || [],
    };

    this.modalMode = 'view';
    this.loadUsers(section.id);
    this.loadCameras(section.id);
    this.isModalOpen = true;
  }


  closeModal(): void {
    this.isModalOpen = false;
  }



  saveSection(section: any): void {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    this.showSuccessAddAlert = false;
    this.showErrorAddAlert = false;
    this.showSuccessAlert = false;
    this.showErrorAlert = false;

    if (this.modalMode === 'add') {
      this.http.post('http://localhost:8080/api/sections', section,{headers}).subscribe({
        next: () => {
          this.fetchSections();
          this.showSuccessAddAlert = true;
          this.isModalOpen = false;
        },
        error: (error) => {
          this.showErrorAddAlert = true;
          console.error("❌ Error adding section", error);
        }
      });
    } else {
      this.http.put(`http://localhost:8080/api/sections/${section.id}`, section, {headers}).subscribe({
        next: () => {
          this.fetchSections(); // ✅ Refresh data
          this.isModalOpen = false;
          this.showSuccessAddAlert = true;
        },
        error: (error) => {
          this.showErrorAddAlert = true;
          console.error("❌ Error updating section", error);
        }
      });
    }
  }


  private loadUsers(sectionId?: string) {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    if (this.modalMode === 'view' && sectionId) {
      this.http.get<any>(`http://localhost:8080/api/users/assigned-to-section/${sectionId}`,{headers}).subscribe({
        next: (data) => this.allUsers = data,
        error: (err) => console.error("❌ Error loading assigned users", err)
      });
    } else if (sectionId) {
      this.http.get<any>(`http://localhost:8080/api/users/for-section/${sectionId}`, {headers}).subscribe({
        next: (data) => this.allUsers = data,
        error: (err) => console.error("❌ Error loading all related users", err)
      });
    } else {
      this.http.get<any>('http://localhost:8080/api/users/unassigned', {headers}).subscribe({
        next: (data) => this.allUsers = data,
        error: (err) => console.error("❌ Error loading unassigned users", err)
      });
    }
  }




  private loadCameras(sectionId?: string) {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    if (this.modalMode === 'view' && sectionId) {
      this.http.get<any>(`http://localhost:8080/api/cameras/assigned-to-section/${sectionId}`, {headers}).subscribe({
        next: (data) => this.allCameras = data,
        error: (err) => console.error("❌ Error loading assigned cameras", err)
      });
    } else if (sectionId) {
      this.http.get<any>(`http://localhost:8080/api/cameras/for-section/${sectionId}`,{headers}).subscribe({
        next: (data) => this.allCameras = data,
        error: (err) => console.error("❌ Error loading all related cameras", err)
      });
    } else {
      this.http.get<any>('http://localhost:8080/api/cameras/unassigned',{headers}).subscribe({
        next: (data) => this.allCameras = data,
        error: (err) => console.error("❌ Error loading unassigned cameras", err)
      });
    }
  }

}



