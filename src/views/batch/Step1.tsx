// components/form/Step1.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const Step1: React.FC = () => (
  <>
    <InputField name="batchName" label="Batch Name" />
    <InputField name="description" label="Details" rows={7} />
  </>
);

export default Step1;
