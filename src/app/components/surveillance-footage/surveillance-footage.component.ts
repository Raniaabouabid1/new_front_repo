import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-surveillance-footage',
  imports: [
    NgForOf
  ],
  templateUrl: './surveillance-footage.component.html',
  styleUrl: './surveillance-footage.component.css'
})export class SurveillanceFootageComponent {
  categories = ["All", "Normal Sections", "Hallways", "Gates", "Parking Areas", "VIP Sections"];
  selectedCategory = "All";

  footageData = [
    {
      name: "Normal Sections",
      cameras: [
        { name: "Camera 1", date: "15-05-2024", time: "12:19:49 PM", viewers: 86, liveFeedUrl: "/assets/live_feed1.mp4" },
        { name: "Camera 2", date: "15-05-2024", time: "12:19:49 PM", viewers: 56, liveFeedUrl: "/assets/live_feed2.mp4" },
      ]
    },
    {
      name: "Hallways",
      cameras: [
        { name: "Camera 1", date: "15-05-2024", time: "12:19:49 PM", viewers: 32, liveFeedUrl: "/assets/live_feed3.mp4" },
        { name: "Camera 2", date: "15-05-2024", time: "12:19:49 PM", viewers: 18, liveFeedUrl: "/assets/live_feed4.mp4" },
      ]
    },
    {
      name: "Gates",
      cameras: [
        { name: "Camera 1", date: "15-05-2024", time: "12:19:49 PM", viewers: 32, liveFeedUrl: "/assets/live_feed5.mp4" },
        { name: "Camera 2", date: "15-05-2024", time: "12:19:49 PM", viewers: 18, liveFeedUrl: "/assets/live_feed6.mp4" },
      ]
    }
  ];

  filteredFootage = [...this.footageData];

  // Track carousel position for each section
  carouselPosition: { [key: string]: number } = {};

  constructor() {
    // Initialize carousel positions
    this.footageData.forEach(section => {
      this.carouselPosition[section.name] = 0;
    });
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
    this.filteredFootage = category === "All"
      ? [...this.footageData]
      : this.footageData.filter(section => section.name === category);
  }

  // Move to previous slide
  prevSlide(sectionName: string) {
    if (this.carouselPosition[sectionName] > 0) {
      this.carouselPosition[sectionName] -= 320; // Adjust slide width
    }
  }

  // Move to next slide
  nextSlide(sectionName: string) {
    const totalItems = this.filteredFootage.find(sec => sec.name === sectionName)?.cameras.length || 0;
    if (this.carouselPosition[sectionName] < (totalItems - 2) * 320) {
      this.carouselPosition[sectionName] += 320;
    }
  }
}
