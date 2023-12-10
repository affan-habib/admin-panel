// components/form/Step3.tsx
import React from 'react';
import { Grid } from '@mui/material';
import InputFile from 'components/form/InputFile';
import MainCard from 'components/cards/MainCard';
import InputField from 'components/form/InputField';
import InputSelect from 'components/form/InputSelect';

const Step3: React.FC = () => (
  <MainCard title="গ্লোবাল সেটিংস অ্যাড করুন">
    <Grid container spacing={2}>
      <Grid item md={6}>
        <InputField
          required={true}
          name="code"
          type="number"
          label="Course Code"
          placeholder="Write the code here..."
        />
      </Grid>
      <Grid item md={6}>
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
      </Grid>
    </Grid>
    <InputFile
      name="featured_image"
      label="Feature Image"
      acceptedFileTypes="image/*"
      limit="Feature image: 300X500 and less than 200KB, File upload size"
    />
    <InputFile
      name="icon"
      label="Icon"
      acceptedFileTypes="image/*"
      limit="Icon image can be 300 X 300 and less than 100KB"
    />
    <InputFile
      name="supporting_doc"
      label="Supporting Documents"
      acceptedFileTypes=".doc, .docx, .ppt"
      limit="less than 5 MB"
    />
    <InputField name="remarks" label="Remarks" placeholder="Remarks" rows={3} />
  </MainCard>
);

export default Step3;
