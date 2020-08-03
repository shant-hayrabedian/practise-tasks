export interface User {
    id?: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: Role;
  }

export enum Role {
    user = 'User',
    admin = 'Admin'
}
