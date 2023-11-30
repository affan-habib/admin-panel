// components/form/StepOne.tsx
import React from 'react';
import InputField from 'components/form/InputField';
import MainCard from 'components/cards/MainCard';

const StepOne: React.FC = () => (
  <MainCard title="পাঠ্যক্রম তৈরি করুন">
    <InputField
      name="batchName"
      label="পাঠ্যক্রমের নাম"
      placeholder="পাঠ্যক্রমের নাম লিখুন"
    />
    <InputField
      name="batchName"
      label="পাঠ্যক্রমের সংক্ষিপ্ত বিবরণ"
      placeholder="সংক্ষিপ্ত বিবরণ লিখুন"
    />
    <InputField
      name="batchName"
      label="পাঠ্যক্রমের বিস্তারিত বিবরণ"
      placeholder="বিস্তারিত বিবরণ লিখুন"
    />
  </MainCard>
);

export default StepOne;
