import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFComponent } from './dashboard-f.component';

describe('DashboardFComponent', () => {
  let component: DashboardFComponent;
  let fixture: ComponentFixture<DashboardFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
