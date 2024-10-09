import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent {

  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otp: string[] = ['', '', '', '', '', ''];


  focusNext(event: any, index: number): void {
    const input = event.target;
    const value = input.value;


    if (value.length === 1 && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    else if (value.length === 0 && event.inputType === 'deleteContentBackward' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }


  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
    this.otp=['', '', '', '', '', ''];
  }


  verifyOtp() {
    const otpValue = this.otp.join('');
    console.log('Entered OTP:', otpValue);

    this.closeModal();
  }


  resendOtp() {
    console.log('OTP Resent');

  }
}
