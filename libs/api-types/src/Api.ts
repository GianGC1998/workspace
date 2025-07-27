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

import {
  AuthUserDto,
  CategoryControllerFindAllParams,
  CategoryEntity,
  CreateUpdateCategoryDto,
  CreateUpdateItemDto,
  CreateUpdateProviderDto,
  GetAverageSaleByStoreResponseDto,
  GetItemResponseDto,
  GetSalesByStoreResponseDto,
  GetStoresByUserResponseDto,
  GetUsersQueryDto,
  ItemControllerFindAllParams,
  ItemEntity,
  LoginDto,
  LoginResponseDto,
  PaginationResponseDtoCategoryEntity,
  PaginationResponseDtoItemEntity,
  PaginationResponseDtoOmitTypeClass,
  PaginationResponseDtoUserEntity,
  ProviderControllerFindAllParams,
  ProviderEntity,
  ReportControllerGetAverageSaleByStoreParams,
  ReportControllerGetSalesByStoreParams,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags users
   * @name UserControllerGetUsers
   * @summary Get all users
   * @request POST:/api/users/paginated
   * @secure
   */
  userControllerGetUsers = (data: GetUsersQueryDto, params: RequestParams = {}) =>
    this.request<PaginationResponseDtoUserEntity, any>({
      path: `/api/users/paginated`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogin
   * @summary Login
   * @request POST:/api/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.request<
      LoginResponseDto,
      {
        /** @example "hairhands_session=token; Path=/; HttpOnly; Secure; SameSite=Strict" */
        'Set-Cookie'?: string;
      }
    >({
      path: `/api/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogout
   * @summary Logout
   * @request POST:/api/auth/logout
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth/logout`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerMe
   * @summary Get current user
   * @request GET:/api/auth/me
   */
  authControllerMe = (params: RequestParams = {}) =>
    this.request<AuthUserDto, any>({
      path: `/api/auth/me`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags reports
   * @name ReportControllerGetAverageSaleByStore
   * @summary Get average sale by store
   * @request GET:/api/reports/dashboard/average-sale-by-store
   * @secure
   */
  reportControllerGetAverageSaleByStore = (
    query: ReportControllerGetAverageSaleByStoreParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAverageSaleByStoreResponseDto, any>({
      path: `/api/reports/dashboard/average-sale-by-store`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags reports
   * @name ReportControllerGetSalesByStore
   * @summary Get sales by store
   * @request GET:/api/reports/dashboard/sales-by-store
   * @secure
   */
  reportControllerGetSalesByStore = (query: ReportControllerGetSalesByStoreParams, params: RequestParams = {}) =>
    this.request<GetSalesByStoreResponseDto, any>({
      path: `/api/reports/dashboard/sales-by-store`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags stores
   * @name StoreControllerGetByUser
   * @summary Get stores by user
   * @request GET:/api/stores/user
   * @secure
   */
  storeControllerGetByUser = (params: RequestParams = {}) =>
    this.request<GetStoresByUserResponseDto, any>({
      path: `/api/stores/user`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags categories
   * @name CategoryControllerFindAll
   * @summary Get all categories
   * @request GET:/api/categories/paginated
   * @secure
   */
  categoryControllerFindAll = (query: CategoryControllerFindAllParams, params: RequestParams = {}) =>
    this.request<PaginationResponseDtoCategoryEntity, any>({
      path: `/api/categories/paginated`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags categories
   * @name CategoryControllerFindById
   * @summary Get a category by id
   * @request GET:/api/categories/{id}
   * @secure
   */
  categoryControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<CategoryEntity, any>({
      path: `/api/categories/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags categories
   * @name CategoryControllerUpdate
   * @summary Update a category
   * @request PUT:/api/categories/{id}
   * @secure
   */
  categoryControllerUpdate = (id: number, data: CreateUpdateCategoryDto, params: RequestParams = {}) =>
    this.request<CategoryEntity, any>({
      path: `/api/categories/${id}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags categories
   * @name CategoryControllerDeactivate
   * @summary Deactivate a category
   * @request PATCH:/api/categories/{id}
   * @secure
   */
  categoryControllerDeactivate = (id: number, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/api/categories/${id}`,
      method: 'PATCH',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags categories
   * @name CategoryControllerCreate
   * @summary Create a category
   * @request POST:/api/categories
   * @secure
   */
  categoryControllerCreate = (data: CreateUpdateCategoryDto, params: RequestParams = {}) =>
    this.request<CategoryEntity, any>({
      path: `/api/categories`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags items
   * @name ItemControllerFindAll
   * @summary Get all items
   * @request GET:/api/items/paginated
   * @secure
   */
  itemControllerFindAll = (query: ItemControllerFindAllParams, params: RequestParams = {}) =>
    this.request<PaginationResponseDtoItemEntity, any>({
      path: `/api/items/paginated`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags items
   * @name ItemControllerFindById
   * @summary Get an item by id
   * @request GET:/api/items/{id}
   * @secure
   */
  itemControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<GetItemResponseDto, any>({
      path: `/api/items/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags items
   * @name ItemControllerUpdate
   * @summary Update an item
   * @request PUT:/api/items/{id}
   * @secure
   */
  itemControllerUpdate = (id: number, data: CreateUpdateItemDto, params: RequestParams = {}) =>
    this.request<ItemEntity, any>({
      path: `/api/items/${id}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags items
   * @name ItemControllerDeactivate
   * @summary Deactivate an item
   * @request PATCH:/api/items/{id}
   * @secure
   */
  itemControllerDeactivate = (id: number, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/api/items/${id}`,
      method: 'PATCH',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags items
   * @name ItemControllerCreate
   * @summary Create an item
   * @request POST:/api/items
   * @secure
   */
  itemControllerCreate = (data: CreateUpdateItemDto, params: RequestParams = {}) =>
    this.request<ItemEntity, any>({
      path: `/api/items`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags providers
   * @name ProviderControllerFindAll
   * @summary Get all providers
   * @request GET:/api/providers/paginated
   * @secure
   */
  providerControllerFindAll = (query: ProviderControllerFindAllParams, params: RequestParams = {}) =>
    this.request<PaginationResponseDtoOmitTypeClass, any>({
      path: `/api/providers/paginated`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags providers
   * @name ProviderControllerFindById
   * @summary Get a provider by id
   * @request GET:/api/providers/{id}
   * @secure
   */
  providerControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<ProviderEntity, any>({
      path: `/api/providers/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags providers
   * @name ProviderControllerUpdate
   * @summary Update a provider
   * @request PUT:/api/providers/{id}
   * @secure
   */
  providerControllerUpdate = (id: number, data: CreateUpdateProviderDto, params: RequestParams = {}) =>
    this.request<ProviderEntity, any>({
      path: `/api/providers/${id}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags providers
   * @name ProviderControllerDeactivate
   * @summary Deactivate a provider
   * @request PATCH:/api/providers/{id}
   * @secure
   */
  providerControllerDeactivate = (id: number, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/api/providers/${id}`,
      method: 'PATCH',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags providers
   * @name ProviderControllerCreate
   * @summary Create a provider
   * @request POST:/api/providers
   * @secure
   */
  providerControllerCreate = (data: CreateUpdateProviderDto, params: RequestParams = {}) =>
    this.request<ProviderEntity, any>({
      path: `/api/providers`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
