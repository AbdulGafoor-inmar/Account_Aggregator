export class Identifier {
  identifier: string = '';         // Initialized with an empty string
  identifierType: string = '';     // Initialized with an empty string
}

export class Fip {
  fipID: string = '';              // Initialized with an empty string
  code: string = '';               // Initialized with an empty string
  fipName: string = '';            // Initialized with an empty string
  logoUrl: string = '';            // Initialized with an empty string
  smallUrl: string = '';           // Initialized with an empty string
  discoverOTP: boolean = false;    // Initialized with a default value
  FIs: string[] = [];              // Initialized with an empty array
  identifiers: Identifier[] = [];  // Initialized with an empty array
  fipStatus: string = '';          // Initialized with an empty string
  otpLength: number = 0;           // Initialized with a default value
}

export class FipListResponse {
  fipList: Fip[] = [];             // Initialized with an empty array
}
