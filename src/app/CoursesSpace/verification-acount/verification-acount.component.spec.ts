import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationAcountComponent } from './verification-acount.component';

describe('VerificationAcountComponent', () => {
  let component: VerificationAcountComponent;
  let fixture: ComponentFixture<VerificationAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationAcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
