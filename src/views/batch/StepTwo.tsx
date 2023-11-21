// components/form/StepTwo.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const StepTwo: React.FC = () => (
  <>
    <InputField
      name="batchName"
      label="Batch Name"
      placeholder="Enter batch name here..."
    />
    <InputField
      name="description"
      label="Details"
      rows={7}
      placeholder="Write details..."
    />
  </>
);

export default StepTwo;
