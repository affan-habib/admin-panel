// components/form/StepTwo.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const StepTwo: React.FC = () => (
  <>
    <InputField name='englishField' label='Enlgish name' rows={10}/>
    <InputField name='banglaField' label='bangla field' />
  </>
);

export default StepTwo;
