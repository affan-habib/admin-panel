// components/form/Step3.tsx
import React from 'react';
import { InputLabel, Stack } from '@mui/material';
import InputFile from 'components/form/InputFile';
import InputRadio from 'components/form/InputRadio';
import MainCard from 'components/cards/MainCard';
import InputField from 'components/form/InputField';

const Step3: React.FC = () => (
  <MainCard title="গ্লোবাল সেটিংস অ্যাড করুন">
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
      <InputLabel
        sx={{
          minWidth: 200,
          color: 'black',
          fontWeight: 500,
        }}
      >
        Course Status{' '}
      </InputLabel>
      <InputRadio label="Active" name="status" value={1} />
      <InputRadio label="Inactive" name="status" value={2} />
    </Stack>
    <InputFile name="featured_image" label="Feature Image" />
    <InputFile name="icon" label="Icon" />
    <InputFile name="supporting_doc" label="Supporting Documents" />
    <InputField name="remarks" label="Remarks" placeholder="Remarks" />
  </MainCard>
);

export default Step3;
