// components/form/Step1.tsx
import React from 'react';
import InputField from 'components/form/InputField';
import InputFile from 'components/form/InputFile';

const Step1: React.FC = () => (
    <>
        <InputField name='englishField' label='English Field' />
        <InputFile name='file' label='Post Code' />
    </>
);

export default Step1;
