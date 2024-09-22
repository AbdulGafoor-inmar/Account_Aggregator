// Define the interface for a single transaction
export class Transaction {
  date: string;        // Transaction date, in format 'dd MMM yy'
  time: string;        // Transaction time, e.g., '12:20 AM'
  transactionId: string; // Unique ID for the transaction
  name: string;        // Name of the person or entity
  amount: number;      // Amount in dollars (number type for calculations)
  status: string;  // Status can be either 'Complete' or 'Cancel'
}
