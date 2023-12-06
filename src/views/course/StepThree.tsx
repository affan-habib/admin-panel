// components/form/Step3.tsx
import React from 'react';
import { InputLabel, Stack } from '@mui/material';
import InputFile from 'components/form/InputFile';
import InputRadio from 'components/form/InputRadio';
import MainCard from 'components/cards/MainCard';
import InputField from 'components/form/InputField';
import InputSelect from 'components/form/InputSelect';

const Step3: React.FC = () => (
  <MainCard title="গ্লোবাল সেটিংস অ্যাড করুন">
    <InputField
      name="code"
      label="Course Code"
      placeholder="Write the code here..."
    />
    <InputSelect
      name="status"
      label="Status"
      options={[
        { value: 1, label: 'Active' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'Draft' },
        { value: 4, label: 'On Hold' },
      ]}
    />
    <InputFile
      name="featured_image"
      label="Feature Image"
      acceptedFileTypes="image/*"
    />
    <InputFile name="icon" label="Icon" acceptedFileTypes="image/*" />
    <InputFile
      name="supporting_doc"
      label="Supporting Documents"
      acceptedFileTypes=".doc, .docx, .ppt"
    />
    <InputField name="remarks" label="Remarks" placeholder="Remarks" />
  </MainCard>
);

export default Step3;
