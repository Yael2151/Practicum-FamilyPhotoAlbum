export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  isActive: boolean;
  createdAt: Date;
  totalSubmissions?: number;
  totalVotes?: number;
}

export interface CreateUserRequest {
  id?: number;
  name: string;
  email: string;
  password: string;
  // role: 'Admin' | 'User';
  // isActive: boolean;
  // isDeleted: boolean;
  createdBy: string;
  // updatedAt: string;
  // updatedBy: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  role: 'Admin' | 'User';
  UpdatedBy?: string;
  // isActive: boolean;

}

export interface UserListResponse {
  users: User[];
  total: number;
}