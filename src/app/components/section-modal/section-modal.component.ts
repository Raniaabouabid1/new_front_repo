import {Component, EventEmitter, Input, Output, OnInit, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-section-modal',
  templateUrl: './section-modal.component.html',
  styleUrls: ['./section-modal.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    NgClass
  ]
})
export class SectionModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';
  @Input() section: any = {
    name: '',
    coordinates: '',
    userIds: [],
    cameraIds: []
  };

  @Input() allUsers: any[] = [];
  @Input() allCameras: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() submitSection = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log('📷 Camera IDs on load:', this.section.cameraIds);
    console.log('📷 users IDs on load:', this.section.userIds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['section']) {
      console.log('📷 Camera IDs updated:', this.section.cameraIds);
    }if (changes['section']) {
      console.log('📷users  IDs updated:', this.section.userIds);
    }

  }


  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.submitSection.emit(this.section);
  }

  toggleCamera(camId: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.section.cameraIds.includes(camId)) {
        this.section.cameraIds.push(camId);
      }
    } else {
      this.section.cameraIds = this.section.cameraIds.filter((id: string) => id !== camId);
    }
  }

}
