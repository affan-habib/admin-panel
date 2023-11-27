// components/form/Step3.tsx
import React from 'react';
import InputField from 'components/form/InputField';
import InputDate from 'components/form/InputDate';
import { InputLabel, Stack } from '@mui/material';
import InputFile from 'components/form/InputFile';
import InputRadio from 'components/form/InputRadio';

const Step3: React.FC = () => (
  <>
    <Stack direction="row" spacing={2} alignItems="flex-end">
      <InputDate name="startDate" label="Timeline" />
      <InputDate name="endDate" />
    </Stack>
    <InputField name="batchCapacity" label="Batch Capacity" type="number" />
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
      <InputLabel
        sx={{
          minWidth: 200,
          color: 'black',
          fontWeight: 500,
        }}
      >
        Batch Status{' '}
      </InputLabel>
      <InputRadio label="Active" name="selectedOption" value="option1" />
      <InputRadio label="Inactive" name="selectedOption" value="option2" />
    </Stack>
    <InputFile name="image" label="Cover Image" />
  </>
);

export default Step3;
