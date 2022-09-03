import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMyComponent } from './layout-my.component';

describe('LayoutMyComponent', () => {
  let component: LayoutMyComponent;
  let fixture: ComponentFixture<LayoutMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutMyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
