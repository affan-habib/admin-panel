// components/form/Step2.tsx
import React from 'react';
import InputField from 'components/form/InputField';

const Step2: React.FC = () => (
  <>
    <InputField name='englishField' label='Enlgish name' rows={10}/>
    <InputField name='banglaField' label='bangla field' />
  </>
);

export default Step2;
