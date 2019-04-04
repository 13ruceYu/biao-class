import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {

  val = 'yoyoyo';

  visible = false;

  log() {
    console.log(1);
  }

  constructor() { }

  ngOnInit() {
  }

}
