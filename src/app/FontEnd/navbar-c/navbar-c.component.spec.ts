import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCComponent } from './navbar-c.component';

describe('NavbarCComponent', () => {
  let component: NavbarCComponent;
  let fixture: ComponentFixture<NavbarCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
