import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const CustomTextField: React.FC<any> = ({ label, ...props }) => {
  return (
    <div>
      {label && (
        <InputLabel
          htmlFor={props.id}
          sx={{
            // minWidth: 200,
            color: 'black',
            my: 1,
            fontWeight: 500,
          }}
        >
          {label}
        </InputLabel>
      )}
      <TextField size="small" fullWidth {...props} variant="outlined" />
    </div>
  );
};

export default CustomTextField;
