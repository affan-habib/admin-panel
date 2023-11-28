// components/form/StepOne.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const StepOne: React.FC = () => (
  <>
    <InputField
      name="batchName"
      label="পাঠ্যক্রমের নাম"
      placeholder="পাঠ্যক্রমের নাম লিখুন"
    />
    <InputField
      name="batchName"
      label="ব্যাচের নাম"
      placeholder="ব্যাচের নাম লিখুন"
    />
    <InputField
      name="batchName"
      label="ব্যাচের সংক্ষিপ্ত বিবরণ"
      placeholder="সংক্ষিপ্ত বিবরণ লিখুন"
    />
    <InputField
      name="batchName"
      label="ব্যাচের বিস্তারিত বিবরণ"
      placeholder="বিস্তারিত বিবরণ লিখুন"
    />
   
  </>
);

export default StepOne;
