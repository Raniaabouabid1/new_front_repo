import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-surveillance-footage',
  templateUrl: './surveillance-footage.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./surveillance-footage.component.css']
})
export class SurveillanceFootageComponent implements OnInit {
  cameras: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCameras();
  }

  fetchCameras(): void {
    const token = localStorage.getItem('jwt');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any[]>('http://localhost:8080/api/cameras', { headers }).subscribe({
      next: (data) => this.cameras = data,
      error: (err) => console.error("❌ Could not load cameras", err)
    });
  }

  getStreamUrl(cam: any): string {
    console.log(`[🎯 STREAM LINK] http://localhost:${cam.flaskPort}/stream/${cam.streamToken}`);
    return `http://localhost:${cam.flaskPort}/stream/${cam.streamToken}`;
  }


}
