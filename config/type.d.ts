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
}
