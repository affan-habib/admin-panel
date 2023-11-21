// components/form/StepOne.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const StepOne: React.FC = () => (
  <>
    <InputField
      name="batchName"
      label="ব্যাচের নাম"
      placeholder="ব্যাচের নাম"
    />
    <InputField name="description" label="বিবরণ" rows={7} placeholder="বিবরণ" />
  </>
);

export default StepOne;
