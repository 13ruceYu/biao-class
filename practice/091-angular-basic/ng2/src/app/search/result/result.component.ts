import { Component, OnInit } from '@angular/core';
import { Person } from '../../person';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  list = [
    new Person('海绵宝宝', 12),
    new Person('派大星', 12),
    new Person('蟹老板', 32),
    // {name: '海绵宝宝', age: 12},
    // {name: '派大星', age: 12},
    // {name: '蟹老板', age: 32},
  ];

  constructor() { }

  ngOnInit() {
  }

}
