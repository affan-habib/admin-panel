


export function createComponents() {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderRight: '1px solid #D0D0D0',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#F2F8F6',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
    MuiTableHeadCell: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  };
}
