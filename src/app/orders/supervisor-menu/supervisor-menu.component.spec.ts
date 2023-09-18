import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorMenuComponent } from './supervisor-menu.component';

describe('SupervisorMenuComponent', () => {
  let component: SupervisorMenuComponent;
  let fixture: ComponentFixture<SupervisorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
