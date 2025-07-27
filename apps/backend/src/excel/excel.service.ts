import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import get from 'lodash/get';
import { ColumnDefinitionDto } from './dto/column-definition.dto';
import type { ExcelDocumentConfig } from './types/excel-document-config';

@Injectable()
export class ExcelService {
  buildDocument<T extends object>(
    config: ExcelDocumentConfig<T>
  ): ExcelJS.Workbook {
    const document = new ExcelJS.Workbook();
    document.creator = 'Hair&Hands';
    document.created = new Date();

    if (config.multipleTabs === true) {
      for (const tab of config.tabs) {
        const worksheet = document.addWorksheet(tab.worksheetName);
        worksheet.addRow(this.getHeader(tab.columnDefinitions));
        worksheet.addRows(
          tab.rows.map((row) =>
            this.getFormattedValues(row, tab.columnDefinitions)
          )
        );
        tab.callback?.(worksheet);
        if (tab.defaultStyle) {
          this.applyDefaultStyles(worksheet);
        }
      }
    } else if (config.multipleTabs === false) {
      const worksheet = document.addWorksheet();
      worksheet.addRow(this.getHeader(config.columnDefinitions));
      worksheet.addRows(
        config.rows.map((row) =>
          this.getFormattedValues(row, config.columnDefinitions)
        )
      );
      config.callback?.(worksheet);
      if (config.defaultStyle) {
        this.applyDefaultStyles(worksheet);
      }
    }

    return document;
  }

  private getHeader<T extends object>(
    columnDefinitions: ColumnDefinitionDto<T>[]
  ): string[] {
    const header = columnDefinitions.flatMap((colDef) =>
      !colDef.columns?.length
        ? colDef.header
        : colDef.columns.map(({ header }) => `${colDef.header} - ${header}`)
    );

    return header;
  }

  private getFormattedValues<T extends object>(
    row: T,
    columnDefinitions: ColumnDefinitionDto<T>[]
  ): string[] {
    return columnDefinitions.flatMap((columnDefinition) => {
      const originalValue = get(row, columnDefinition.accessor);

      if (columnDefinition.columns) {
        return this.getFormattedValues(row, columnDefinition.columns);
      }

      if (!columnDefinition.format) {
        return originalValue ?? '';
      }

      return columnDefinition.format(originalValue, row);
    });
  }

  applyDefaultStyles(worksheet: ExcelJS.Worksheet): void {
    const headerStyles: Partial<ExcelJS.Style> = {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF9C6B63' },
      },
      font: {
        color: { argb: 'FFFFFFFF' },
        bold: true,
        size: 16,
      },
    };
    const bodyStyles: Partial<ExcelJS.Style> = {
      font: {
        size: 14,
      },
    };

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      const column = worksheet.getColumn(cell.col);
      const contentWidth = Math.max(40, cell.value?.toString().length || 0);
      column.width = contentWidth;
      cell.style = headerStyles;
      cell.alignment = {
        wrapText: true,
        horizontal: 'center',
        vertical: 'middle',
      };
    });

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      row.eachCell((cell) => {
        cell.alignment = { wrapText: true };

        cell.style = bodyStyles;
      });
    }
  }
}
