export class Identifier {
  identifier: string = '';
  identifierType: string = '';
}

export class Fip {
  fipID: string = '';
  code: string = '';
  fipName: string = '';
  logoUrl: string = '';
  smallUrl: string = '';
  discoverOTP: boolean = false;
  FIs: string[] = [];
  identifiers: Identifier[] = [];
  fipStatus: string = '';
  otpLength: number = 0;
}

export class FipListResponse {
  fipList: Fip[] = [];
}
