export interface User {
  id: string;
  username: string;
  email: string;
  token?: string;
  role?: UserRoles;
  //   companies?: CompanyUser[];
  //   salesAsCashier?: Sale[];
  createdOn: string;
  updatedOn: string;
  isDeleted: boolean;
  profilePicture?: Media;
  profilePictureLink?: string;
}

export interface Notification extends BaseModel {
  title: string;
  message: string;
  isRead: boolean;
  type: NotificationTypes;
  userId?: number;
  user?: User;
  actionUrl: string;
}

export enum NotificationTypes {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  EXPIRED = "EXPIRED",
  CRITICAL = "CRITICAL",
}

export enum UserRoles {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  CASHIER = "CASHIER",
  USER = "USER",
}

export interface Media extends BaseModel {
  url: string;
  objectKey: string;
  altText: string;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
  showInGallery: boolean;
}

export interface BaseModel {
  id: number;
  uuid: string;
  createdOn: string;
  updatedOn: string;
  isDeleted: boolean;
  isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  meta?: QueryObject;
  errors?: string[];
  timestamp: string;
}

export interface QueryObject {
  pageNumber?: number;
  pageSize?: number;
  showInGallery?: boolean;
  isDeleted?: boolean;
  sortBy?: ESortBy;
  uuid?: string;
  companyName?: string;
  role?: UserRoles;
  isAvailable?: boolean;
  search?: string;
  userId?: string;
}

export enum ESortBy {
  ASC = "ASC",
  DSC = "DSC",
}

export type LoginResponse = {
  username: string;
  id: string;
  email: string;
  token: string;
  role: UserRoles;
  profilePicture?: Media;
  profilePictureLink?: string;
};
