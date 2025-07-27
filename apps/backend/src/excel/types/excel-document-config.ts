import type * as ExcelJS from 'exceljs';
import type { ColumnDefinitionDto } from '../dto/column-definition.dto';

export type ExcelTabConfig<T extends object> = {
  rows: T[];
  columnDefinitions: ColumnDefinitionDto<T>[];
  callback?: (worksheet: ExcelJS.Worksheet) => void;
  defaultStyle?: boolean;
  worksheetName?: string;
};

type ExcelSingleTabConfig<T extends object> = {
  multipleTabs?: false;
  rows: T[];
  columnDefinitions: ColumnDefinitionDto<T>[];
  callback?: (worksheet: ExcelJS.Worksheet) => void;
  defaultStyle?: boolean;
};

type ExcelMultipleTabConfig = {
  multipleTabs?: true;
  tabs: ExcelTabConfig<any>[];
};

export type ExcelDocumentConfig<T extends object> =
  | ExcelSingleTabConfig<T>
  | ExcelMultipleTabConfig;
