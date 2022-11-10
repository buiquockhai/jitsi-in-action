export interface Pageable {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
}

export interface BaseResponse<T> {
  statusCode: number;
  data: T;
  pageable?: Pageable;
}

export type JwtResponse = {
  avatar: string;
  code: string;
  id: string;
  name: string;
  role: RoleTypes;
  username: string;
};

export type RoleTypes = 'admin' | 'teacher' | 'student';

export interface LoginResponse {
  data: string;
}

export type DeletedFlag = 'Y' | 'N';
