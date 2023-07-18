export interface TableType {
  id: string;
  name: string;
  capacity: number;
  location: string;
  isParticipated: string;
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
  paid: number;
  order?: Order[];
  createdAt: DateTime;
  updatedAt: DateTime;
  closedAt?: DateTime;
}

export interface Order {
  id: string;
  menuItem: string;
  quantity: number;
  price: number;
  transaction?: Transaction;
  transactionId?: number;
  createdAt: DateTime;
  table: string;
}

export interface Cart {
  menuItem: MenuItem;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: DateTime;
  lastLogin: DateTime;
  role: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
