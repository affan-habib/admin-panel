// components/form/Step2.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const Step2: React.FC = () => (
  <>
    <InputField name="batchName" label="ব্যাচের নাম" />
    <InputField name="description" label="বিবরণ" rows={7} />
  </>
);

export default Step2;
