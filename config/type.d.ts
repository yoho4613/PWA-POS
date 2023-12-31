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
  password: string;
  email: string;
  createdAt: DateTime;
  lastLogin: DateTime;
  role: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  logoKey: string;
  tax: string;
  cashBalance: number;
  description: string;
  url: string;
}

export interface CashUp {
  id: string;
  cash: number;
  card: number;
  other: number;
  createdAt: DateTime;
  closedAt: DateTime;
}

export interface Payment {
  id: string;
  method: string;
  amount: number;
  createdAt: DateTime;
  transactionId: number;
}
