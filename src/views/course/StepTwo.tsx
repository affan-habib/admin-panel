// components/form/StepOne.tsx
import React from 'react';
import InputField from 'components/form/InputField';
import MainCard from 'components/cards/MainCard';

const StepOne: React.FC = () => (
  <MainCard title='Create course'>
    <InputField
      name="batchName"
      label="Course Name"
      placeholder="Enter Course Name"
    />
    <InputField
      name="batchName"
      label="Course Description"
      placeholder="Course Description"
    />
    <InputField
      name="batchName"
      label="Course Detail Description"
      placeholder="Course Detail Description"
    />
  </MainCard>
);

export default StepOne;
