import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @ViewChild('divright', {static: false}) private divright: ElementRef;
  @ViewChild('divleft', {static: false}) private divleft: ElementRef;
  sliderOptions = {
    initialSlide: 1,
    speed: 300,
    autoplay: false
  };

  constructor() { }

  ngOnInit() {}

  hideElementDiv() {
  this.divright.nativeElement.remove();
  this.divleft.nativeElement.remove();
  }

  showElementDiv() {
    this.divright.nativeElement.show();
    this.divleft.nativeElement.show();
    }
}
