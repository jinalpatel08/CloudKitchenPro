export interface User {
  userId: string;
  email: string;
  password?: string;
  fullname: string;
  role: 'admin' | 'chef' | 'manager';
  phone: string;
}