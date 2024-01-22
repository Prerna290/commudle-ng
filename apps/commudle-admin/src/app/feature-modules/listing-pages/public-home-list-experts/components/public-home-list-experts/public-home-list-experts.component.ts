import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-public-home-list-experts',
  templateUrl: './public-home-list-experts.component.html',
  styleUrls: ['./public-home-list-experts.component.scss'],
})
export class PublicHomeListExpertsComponent implements OnInit {
  isMobileView: boolean;
  constructor() {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
  }
}