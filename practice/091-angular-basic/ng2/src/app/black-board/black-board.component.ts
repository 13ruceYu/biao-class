import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-black-board',
  template: `
    <button (click)="toggle()">显示/隐藏</button>
    <div *ngIf="visible">
      <h3>公告</h3>
      <p>
        lalala
      </p>
    </div>
  `,
  styleUrls: ['./black-board.component.css']
})
export class BlackBoardComponent implements OnInit {

  visible = false;

  toggle() {
    this.visible = !this.visible;
  }

  constructor() { }

  ngOnInit() {
  }

}
