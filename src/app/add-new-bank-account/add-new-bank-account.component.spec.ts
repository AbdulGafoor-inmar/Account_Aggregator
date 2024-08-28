import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBankAccountComponent } from './add-new-bank-account.component';

describe('AddNewBankAccountComponent', () => {
  let component: AddNewBankAccountComponent;
  let fixture: ComponentFixture<AddNewBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewBankAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
