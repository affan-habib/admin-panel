import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';
import { createComponents } from './create-components';

export function createTheme() {
  const palette = createPalette();
  const shadows = createShadows();
  const typography = createTypography();
  const components = createComponents();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    palette,
    shadows,
    shape: {
      borderRadius: 4,
    },
    typography,
    components
  });
}
