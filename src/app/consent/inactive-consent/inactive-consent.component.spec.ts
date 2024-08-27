import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveConsentComponent } from './inactive-consent.component';

describe('InactiveConsentComponent', () => {
  let component: InactiveConsentComponent;
  let fixture: ComponentFixture<InactiveConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactiveConsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
