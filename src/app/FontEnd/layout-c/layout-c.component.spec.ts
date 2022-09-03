import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCComponent } from './layout-c.component';

describe('LayoutCComponent', () => {
  let component: LayoutCComponent;
  let fixture: ComponentFixture<LayoutCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
