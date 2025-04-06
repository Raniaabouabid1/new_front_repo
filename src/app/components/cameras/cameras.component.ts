import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICamera } from './ICamera';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForOf } from '@angular/common';
import { CameraModalComponent } from '../camera-modal/camera-modal.component';

@Component({
  selector: 'app-cameras',
  standalone: true,
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    CameraModalComponent
  ]
})
export class CamerasComponent implements OnInit {
  cameras: ICamera[] = [];
  sections: any[] = [];
  selectedCamera: ICamera | null = null;
  isCameraModalOpen: boolean = false;
  modalMode: 'add' | 'edit' | 'view' = 'add';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCameras();
    this.loadSections();
  }

  protected loadCameras(): void {
    const token = localStorage.getItem('jwt');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.get<ICamera[]>('http://localhost:8080/api/cameras', { headers }).subscribe({
      next: (data) => this.cameras = data,
      error: (err) => console.error("❌ Error loading all cameras", err)
    });
    console.log(this.cameras);
  }

  private loadSections(): void {
    const token = localStorage.getItem('jwt');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Default endpoint for view mode
    let endpoint = 'http://localhost:8080/api/sections';

    // In edit mode, we need unassigned sections + assigned section of the current camera
    if (this.modalMode === 'edit' && this.selectedCamera?.sectionId) {
      // 👉 We’ll fetch ALL sections (to include the assigned one)
      endpoint = 'http://localhost:8080/api/sections';
    } else if (this.modalMode === 'add') {
      endpoint = 'http://localhost:8080/api/sections/unassigned';
    }

    this.http.get<any>(endpoint, { headers }).subscribe({
      next: (data) => {
        this.sections = Array.isArray(data) ? data : data.content;
        console.log("✅ Sections loaded:", this.sections);
      },
      error: (err) => console.error("❌ Error loading sections", err)
    });
  }


  openAddModal(): void {
    this.selectedCamera = { name: '', sectionId: null };
    this.modalMode = 'add';
    this.isCameraModalOpen = true;
    this.loadSections(); // 👈 Add this
  }

  openEditModal(camera: ICamera): void {
    this.selectedCamera = { ...camera };
    this.modalMode = 'edit';
    this.isCameraModalOpen = true;
    this.loadSections(); // 👈 Add this
  }

  openViewModal(camera: ICamera): void {
    this.selectedCamera = { ...camera };
    this.modalMode = 'view';
    this.isCameraModalOpen = true;
    this.loadSections(); // 👈 Add this
  }


  closeCameraModal(): void {
    this.isCameraModalOpen = false;
    this.selectedCamera = null;
  }

  saveCamera(camera: ICamera): void {
    const token = localStorage.getItem('jwt');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // 👉 Step 1: Auto-generate token and fetch IP
    const streamToken = camera.streamToken || this.generateStreamToken(camera.name);
    const ipAddress = window.location.hostname; // detects local IP (best-effort)
    const streamUrl = `http://${ipAddress}:4747/video`;

    // 👉 Step 2: Add fields to camera object
    const payload = {
      ...camera,
      streamToken,
      ipAddress,
      streamUrl
    };

    if (this.modalMode === 'add') {
      this.http.post('http://localhost:8080/api/cameras', payload, { headers }).subscribe({
        next: () => {
          this.loadCameras();
          this.isCameraModalOpen = false;
        },
        error: (err) => console.error("❌ Error adding camera", err)
      });
    } else if (this.modalMode === 'edit' && camera.id) {
      this.http.put(`http://localhost:8080/api/cameras/${camera.id}`, payload, { headers }).subscribe({
        next: () => {
          this.loadCameras();
          this.isCameraModalOpen = false;
        },
        error: (err) => console.error("❌ Error updating camera", err)
      });
    }
  }

// ✅ Helper function to generate a unique stream token
  generateStreamToken(name: string): string {
    const cleanName = name.toLowerCase().replace(/\s+/g, '_');
    const random = Math.floor(Math.random() * 10000);
    return `${cleanName}_${random}`;
  }


  deleteCamera(cameraId: string): void {
    const token = localStorage.getItem('jwt');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.delete(`http://localhost:8080/api/cameras/${cameraId}`, { headers }).subscribe({
      next: () => this.loadCameras(),
      error: (err) => console.error("❌ Error deleting camera", err)
    });
  }
}
