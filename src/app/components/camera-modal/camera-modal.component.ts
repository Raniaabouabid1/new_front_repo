// ✅ UPDATED CAMERA MODAL TO ADD CAMERA + AUTO REGISTER BACKEND + START FLASK STREAM

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camera-modal',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss']
})
export class CameraModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';
  @Input() allSections: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() cameraAdded = new EventEmitter<void>();

  camera: any = {
    name: '',
    sectionId: null,
    ipAddress: ''
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
    if (!this.camera.name) return;

    const token = this.generateStreamToken(this.camera.name);

    // 📡 Detect local IP using a public STUN API or let Python detect it
    const ip = this.camera.ipAddress || window.location.hostname;
    const streamUrl = `http://${ip}:4747/video`;

    const payload = {
      name: this.camera.name,
      streamToken: token,
      ipAddress: ip,
      streamUrl: streamUrl,
      sectionId: this.camera.sectionId
    };

    console.log('📤 Sending camera registration payload:', payload);

    this.http.post('http://localhost:8080/api/cameras', payload).subscribe({
      next: (res: any) => {
        console.log('✅ Camera registered successfully:', res);
        this.cameraAdded.emit();
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

  private async detectLocalIp(): Promise<string> {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn("⚠️ Could not detect external IP, defaulting to localhost");
      return 'localhost';
    }
  }
}
