import { ThemeConfig } from 'antd';
import {
  errorColor,
  infoColor,
  primaryColor,
  successColor,
  warningColor,
} from './colors';

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: primaryColor,
    colorError: errorColor,
    colorWarning: warningColor,
    colorSuccess: successColor,
    colorInfo: infoColor,
  },
  // algorithm: antdTheme.compactAlgorithm,
};

export default theme;
