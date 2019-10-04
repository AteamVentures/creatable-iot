import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @ViewChild('textOn') textOn: ElementRef;
  @ViewChild('textOff') textOff: ElementRef;
  @ViewChild('expandOn') expandOn: ElementRef;
  @ViewChild('expandOf') expandOf: ElementRef;
  @Input() toggleOn: boolean;
  @Output() command = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  toggle() {
    this.command.emit(!this.toggleOn);
  }

}
