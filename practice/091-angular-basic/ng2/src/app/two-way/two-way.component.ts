import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way',
  template: `
    <h2>使用ngModel进行双向绑定</h2>
    <input [(ngModel)]="name">
    <div>{{name}}</div>

    <h2>双向绑定的原理</h2>
    <input [value]="name" (input)="name = $event.target.value">
  `,
  styleUrls: ['./two-way.component.css']
})
export class TwoWayComponent implements OnInit {
  name = 'yoyoyo';

  constructor() { }

  ngOnInit() {
  }

}
