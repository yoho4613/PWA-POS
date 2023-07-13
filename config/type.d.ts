export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface TableType {
  id: string;
  name: string;
  capacity: number;
  location: string;
  isParticipated: false;
  order: number;
}

export interface Categories {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  name: string;
  price: number;
  categories: string[];
  imageKey: string;
  active: boolean;
  url: string;
  description: string;
}

export interface TransactionType {
  id: number;
  customerName: string;
  people: number;
  payment: number;
  subtotal: number;
  paid: boolean;
  order?: Order[];
}

export interface Order {
  id: string;
  menuItem: string;
  quantity: number;
  transaction?: Transaction;
  transactionId?: number;
}

export interface Cart {
  menuItem: MenuItem;
  quantity: number;
}
