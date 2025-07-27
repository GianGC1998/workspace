import { ColumnDefinitionDto } from '../../excel/dto/column-definition.dto';
import { ReportCorporativeServiceColumnsDto } from '../dto/report-corporative-columns.dto';
import { ReportCorporativeStoreColumnsDto } from '../dto/report-corporative-columns.dto';
import { ReportCorporativeCustomerColumnsDto } from '../dto/report-corporative-columns.dto';

export interface ReportCorporativeColumns {
  storeColumns: ColumnDefinitionDto<ReportCorporativeStoreColumnsDto>[];
  serviceColumns: ColumnDefinitionDto<ReportCorporativeServiceColumnsDto>[];
  customerColumns: ColumnDefinitionDto<ReportCorporativeCustomerColumnsDto>[];
}
