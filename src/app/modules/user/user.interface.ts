export enum Role {
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER"
};


export interface IUser {
  _id?: string;               // MongoDB ObjectId (optional during creation)
  name: string;               // User full name
  email: string;              // Unique email
  password?: string;          // Hashed password (optional when returning user)
  role: Role;             // Role: admin, sender, receiver
  isBlocked?: boolean;        // Blocked status (default: false)
  createdAt?: Date;           // Auto timestamps
  updatedAt?: Date;
}


export interface IUserLogin {
  email: string;
  password: string;
}