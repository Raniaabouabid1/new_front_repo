import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camera-modal',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.css']
})
export class CameraModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';
  @Input() allSections: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() cameraAdded = new EventEmitter<any>(); // send camera data back to parent

  camera: any = {
    name: '',
    sectionId: null,
    ipAddress: '',
    flaskPort: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('📷 Modal Initialized');
  }

  generateStreamToken(name: string): string {
    const suffix = Math.floor(Math.random() * 10000);
    return name.toLowerCase().replace(/\s+/g, '_') + '_' + suffix;
  }

  async onSubmit(): Promise<void> {
    if (!this.camera.name || !this.camera.flaskPort) {
      alert("Please enter camera name and port!");
      return;
    }

    const token = this.generateStreamToken(this.camera.name);
    const ip = this.camera.ipAddress || window.location.hostname;
    const streamUrl = `http://${ip}:4747/video`;

    const payload = {
      name: this.camera.name,
      streamToken: token,
      ipAddress: ip,
      streamUrl,
      sectionId: this.camera.sectionId,
      flaskPort: this.camera.flaskPort,
    };

    console.log('📤 Sending camera registration payload:', payload);

    this.http.post('http://localhost:8080/api/cameras', payload).subscribe({
      next: (res: any) => {
        console.log('✅ Camera registered successfully:', res);
        this.cameraAdded.emit(payload); // emit full camera info back
        this.close.emit();
      },
      error: (err) => console.error('❌ Failed to register camera:', err)
    });
  }

  getSectionNameById(id: string | null): string {
    const section = this.allSections.find(s => s.id === id);
    return section ? section.name : 'Not assigned to any section';
  }

  onClose(): void {
    this.close.emit();
  }
}
