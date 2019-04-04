import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event',
  template: `
    <h2>自定义事件</h2>
    <button type="button" (click)="btnClick()">你点我呀</button>
  `,
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  btnClick() {
    this.change.emit('我被点了');
  }

}
