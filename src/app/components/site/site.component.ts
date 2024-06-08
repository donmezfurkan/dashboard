import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  isMobile: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 700;
    window.onresize = () => this.isMobile = window.innerWidth < 700;
  }

}
