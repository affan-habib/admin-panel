// components/form/Step3.tsx
import React from 'react';
import { Grid } from '@mui/material';
import InputFile from 'components/form/InputFile';
import MainCard from 'components/cards/MainCard';
import InputField from 'components/form/InputField';
import InputSelect from 'components/form/InputSelect';
import { useTranslation } from 'react-i18next';

const Step3: React.FC = () => {
  const { t } = useTranslation();
  return(
  <MainCard title={t('addCourseSettings')}>
    <Grid container spacing={2}>
      <Grid item md={6}>
        <InputField
          required={true}
          name="code"
          type="number"
          label={t('courseCode')}
          placeholder="Write the code here..."
        />
      </Grid>
      <Grid item md={6}>
        <InputSelect
          name="status"
          label={t('status')}
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
      label={t('featureImage')}
      acceptedFileTypes="image/*"
      limit={t('featureImgLimit')}
    />
    <InputFile
      name="icon"
      label={t('icon')}
      acceptedFileTypes="image/*"
      limit={t('iconLimit')}
    />
    <InputFile
      name="supporting_doc"
      label={t('supportingDoc')}
      acceptedFileTypes=".doc, .docx, .ppt"
      limit={t('supDocLimit')}
    />
    <InputField name="remarks" label={t('remarks')} placeholder={t('remarks')} rows={3} />
  </MainCard>
  )
};

export default Step3;
