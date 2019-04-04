import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { } from 'events';

@Component({
  selector: 'app-my-input',
  template: `
    <input [value]="myModel" (input)="myModelChange.emit($event.target.value)">
  `,
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent implements OnInit {

  @Input() myModel: string;
  @Output() myModelChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
