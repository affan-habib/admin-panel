import { createTheme, tableCellClasses } from '@mui/material';

// Used only to create transitions
const muiTheme = createTheme();

export function createComponents(config) {
  return {
    MuiButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        // InputLabelProps: { shrink: false }, // Prevent label from shrinking
        InputProps: {
          notched: false, // Prevent the notch effect on focus
        },
      },
    },
    
  };
}
