import React from 'react';
import { FieldHookConfig, useFormikContext } from 'formik';
import { InputLabel, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

type InputFieldProps = FieldHookConfig<string | number> & {
  label?: string;
  name?: string;
  fieldWidth?: number; // New prop for field width
};

const InputDate: React.FC<InputFieldProps> = ({ label, name, fieldWidth }) => {
  const formik: any = useFormikContext();

  const handleDateChange = (selectedDate: any) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    console.log(formattedDate);
    formik.setFieldValue(name, formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}
      >
        {label && (
          <React.Fragment>
            <div>
              <InputLabel
                sx={{
                  minWidth: 200,
                  color: 'black',
                  marginX: 1,
                  marginTop: 1,
                  fontWeight: 600,
                }}
              >
                {label}
              </InputLabel>
            </div>
            <div>
              <Typography variant="body1" sx={{ marginX: 1, marginTop: 1 }}>
                :
              </Typography>
            </div>
          </React.Fragment>
        )}
        <div style={{ width: `${fieldWidth}px`, marginLeft: '8px' }}>
          <DatePicker
            value={moment(formik.values[name])}
            format="DD-MM-YYYY"
            onChange={handleDateChange}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                fullWidth: true,
              },
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default InputDate;
