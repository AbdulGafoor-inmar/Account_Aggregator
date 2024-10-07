import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent {

  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>; // To reference all OTP input elements

  otp: string[] = ['', '', '', '', '', ''];

  // Focus the next input
  focusNext(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    // Move to the next input if current input has a value and it's not the last input
    if (value.length === 1 && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
    // Handle backspace for moving to the previous input
    else if (value.length === 0 && event.inputType === 'deleteContentBackward' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  // Close modal function
  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
    this.otp=['', '', '', '', '', ''];
  }

  // Verify OTP function
  verifyOtp() {
    const otpValue = this.otp.join('');
    console.log('Entered OTP:', otpValue);
    // Perform OTP verification here (call your backend API)
    this.closeModal(); // Close modal after verification
  }

  // Resend OTP function
  resendOtp() {
    console.log('OTP Resent');
    // Trigger OTP resend functionality here
  }
}
