import { Component, OnInit } from '@angular/core';
import VanullaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    VanullaTilt.init(document.querySelectorAll('.tilt') as any);
  }

}