import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch-tower',
  templateUrl: './watch-tower.component.html',
  styleUrls: ['./watch-tower.component.scss']
})
export class WatchTowerComponent implements OnInit {

  welcomePage = true;
  usageInsights = false;
  cleaningInsights = false;
  image1 = false;
  image2= false;
  image3 = false;
  constructor() { }

  ngOnInit(): void {
  }

  OpenUsageInsights() {
    this.welcomePage = false;
    this.cleaningInsights = false;
    this.usageInsights = true;
    this.image1 = true;
  }

  OpenNextImage1() {
    this.image1 = true;
    this.image2 = false; 
    this.image3 = false;
  }

  OpenNextImage2() {
    this.image1 = false;
    this.image2 = true; 
    this.image3 = false;
  }

  OpenNextImage3() {
    this.image1 = false;
    this.image2 = false;
    this.image3 = true; 
  }

  OpenCleaningInsights() {
    this.welcomePage = false;
    this.usageInsights = false;
    this.cleaningInsights = true;
  }
}
