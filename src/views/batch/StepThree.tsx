// components/form/Step3.tsx
import React from 'react';
import InputField from 'components/form/InputField';
import InputSelect from 'components/form/InputSelect';
import InputDate from 'components/form/InputDate';
import { Stack } from '@mui/material';
import InputFile from 'components/form/InputFile';

const Step3: React.FC = () => (
  <>
    <InputSelect
      fieldWidth={200}
      name="status"
      label="ব্যাচের নাম"
      options={[
        { label: 'Active', value: '0' },
        { label: 'Active', value: '1' },
      ]}
    />
    <InputField name="batchCode" label="Batch Code" />
    <Stack direction="row" spacing={2}>
      <InputDate name="startDate" label="Timeline" fieldWidth={200} />
      <InputDate name="endDate" fieldWidth={200} />
    </Stack>
    <InputField name="batchCapacity" label="Batch Capacity" type="number" />
    <InputFile name="image" label="image" />
  </>
);

export default Step3;
