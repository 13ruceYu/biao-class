import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackBoardComponent } from './black-board.component';

describe('BlackBoardComponent', () => {
  let component: BlackBoardComponent;
  let fixture: ComponentFixture<BlackBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
