export interface User {
  name:    string
  email:   string  
  password: string
  role:   string
  createdAt:  DateTime
  updatedAt:  DateTime 
}

export interface TableType {
  id: string;
  name: string;
  capacity: number;
  location: string;
  isParticipated: false;
}