import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathTestComponent } from './path-test.component';

describe('PathTestComponent', () => {
  let component: PathTestComponent;
  let fixture: ComponentFixture<PathTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
