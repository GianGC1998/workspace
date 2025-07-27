/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortingDto {
  key: string;
  order: SortingOrder;
}

export interface GetUsersQueryDto {
  search?: string;
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
  sorting?: SortingDto;
  storeId?: number;
}

export interface UserEntity {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  name: string;
  email: string;
  phone?: string;
  dni?: string;
}

export interface PaginationResponseDtoUserEntity {
  data: UserEntity[];
  total: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export enum Roles {
  SUPERADMIN = 'SUPERADMIN',
  PROPIETARIO_DE_TIENDA = 'PROPIETARIO_DE_TIENDA',
  GERENTE_DE_TIENDA = 'GERENTE_DE_TIENDA',
}

export interface AuthRoleDto {
  name: Roles;
}

export interface AuthUserDto {
  id: number;
  name: string;
  email: string;
  role: AuthRoleDto;
}

export interface LoginResponseDto {
  expiresIn: number;
  user: AuthUserDto;
}

export interface GetAverageSaleByStoreDataDto {
  storeName: string;
  averageSale: number;
  totalSales: number;
}

export interface GetAverageSaleByStoreResponseDto {
  data: GetAverageSaleByStoreDataDto[];
}

export enum DashboardSaleRange {
  Day = 'day',
  Month = 'month',
}

export interface GetSalesByStoreDto {
  totalSales: number;
  totalNet: number;
  range: DashboardSaleRange;
}

export interface GetSalesByStoreDataDto {
  storeName: string;
  data: GetSalesByStoreDto[];
}

export interface GetSalesByStoreResponseDto {
  data: GetSalesByStoreDataDto[];
}

export interface StoreByUserDto {
  id: number;
  name: string;
}

export interface GetStoresByUserResponseDto {
  stores: StoreByUserDto[];
}

export interface CategoryEntity {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  name: string;
}

export interface PaginationResponseDtoCategoryEntity {
  data: CategoryEntity[];
  total: number;
}

export interface CreateUpdateCategoryDto {
  name: string;
}

export enum ItemType {
  PRODUCTO = 'PRODUCTO',
  SERVICIO = 'SERVICIO',
  SUMINISTRO = 'SUMINISTRO',
}

export interface ItemEntity {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  code: string;
  name: string;
  description?: string;
  itemType: ItemType;
}

export interface PaginationResponseDtoItemEntity {
  data: ItemEntity[];
  total: number;
}

export interface GetItemResponseDto {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  code: string;
  name: string;
  description?: string;
  itemType: ItemType;
  /** La categoría del artículo */
  category: CategoryEntity;
}

export interface CreateUpdateItemDto {
  name: string;
  description?: string;
  itemType: ItemType;
  /**
   * The category id
   * @example 1
   */
  categoryId: number;
}

export enum DocumentType {
  DNI = 'DNI',
  RUC = 'RUC',
}

export interface OmitTypeClass {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  code: string;
  name: string;
  document: string;
  phone: string;
  contactName: string;
  documentType: DocumentType;
}

export interface PaginationResponseDtoOmitTypeClass {
  data: OmitTypeClass[];
  total: number;
}

export interface ProviderEntity {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  code: string;
  name: string;
  document: string;
  phone: string;
  contactName: string;
  documentType: DocumentType;
}

export interface CreateUpdateProviderItemDto {
  /**
   * Precio del item por este proveedor
   * @example 25.5
   */
  cost: number;
  /**
   * ID del item
   * @example 1
   */
  itemId: number;
}

export interface CreateUpdateProviderDto {
  name: string;
  document: string;
  phone: string;
  contactName: string;
  documentType: DocumentType;
  /** Items del proveedor */
  items: CreateUpdateProviderItemDto[];
}

export interface ReportControllerGetAverageSaleByStoreParams {
  /** @example "2025-05-01T00:00:00" */
  startDate: string;
  /** @example "2025-05-01T00:00:00" */
  endDate: string;
  stores: number[];
}

export interface ReportControllerGetSalesByStoreParams {
  /** @example "2025-05-01T00:00:00" */
  startDate: string;
  /** @example "2025-05-01T00:00:00" */
  endDate: string;
  stores: number[];
  range: DashboardSaleRange;
}

export interface CategoryControllerFindAllParams {
  search?: string;
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
  sorting?: SortingDto;
}

export interface ItemControllerFindAllParams {
  search?: string;
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
  sorting?: SortingDto;
  /**
   * The provider id to filter items by provider
   * @example 1
   */
  providerId?: number;
}

export interface ProviderControllerFindAllParams {
  search?: string;
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
  sorting?: SortingDto;
}
