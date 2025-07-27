import { Brackets, SelectQueryBuilder } from 'typeorm';
import { SortingDto, SortingOrder } from '../dto/pagination.dto';

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    searchInStringFields(search: string, fields: string[]): this;
    orderByDefault(sorting?: SortingDto, defaultKey?: string): this;
  }
}

SelectQueryBuilder.prototype.searchInStringFields = function (
  search: string,
  fields: string[]
): SelectQueryBuilder<any> {
  if (!search) return this;

  const entityAlias = this.alias;

  this.where(
    new Brackets((sbq) => {
      fields.forEach((field, index) => {
        const searchTerm = `%${search}%`;
        if (index === 0) {
          sbq.where(`LOWER(${entityAlias}.${field}) LIKE LOWER(:searchTerm)`, {
            searchTerm,
          });
        } else {
          sbq.orWhere(
            `LOWER(${entityAlias}.${field}) LIKE LOWER(:searchTerm)`,
            {
              searchTerm,
            }
          );
        }
      });
    })
  );

  return this;
};

SelectQueryBuilder.prototype.orderByDefault = function (
  sorting?: SortingDto,
  defaultKey = 'id'
): SelectQueryBuilder<any> {
  const entityAlias = this.alias;
  const orderKey = sorting?.key ?? defaultKey;
  const orderDirection = sorting?.order ?? SortingOrder.DESC;

  return this.orderBy(`${entityAlias}.${orderKey}`, orderDirection);
};
