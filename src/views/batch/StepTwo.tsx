// components/form/StepOne.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const StepOne: React.FC = () => (
  <>
    <InputField
      name="batchName"
      label="অধিবেশনের নাম"
      placeholder="অধিবেশনের নাম লিখুন"
    />
    <InputField
      name="batchName"
      label="Batch Name"
      placeholder="Enter a batch name"
    />
    <InputField
      name="batchName"
      label="Bactch Small description"
      placeholder="Enter Small description"
    />
    <InputField
      name="batchName"
      label="ব্যাচের বিস্তারিত বিবরণ"
      placeholder="বিস্তারিত বিবরণ লিখুন"
    />
  </>
);

export default StepOne;
