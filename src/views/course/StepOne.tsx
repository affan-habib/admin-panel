import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import InputField from 'components/form/InputField';
import MainCard from 'components/cards/MainCard';
import { InputLabel } from '@mui/material';

const StepOne: React.FC = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (value: any) => {
    setDescription(value);
  };

  return (
    <MainCard title="পাঠ্যক্রম তৈরি করুন">
      <InputField
        name="batchName"
        label="পাঠ্যক্রমের কোড"
        placeholder="পাঠ্যক্রমের কোড লিখুন"
      />
      <InputField
        name="batchName"
        label="পাঠ্যক্রমের নাম"
        placeholder="পাঠ্যক্রমের নাম লিখুন"
      />
      <InputField
        name="shortDescription"
        label="পাঠ্যক্রমের সংক্ষেপ বিবরণ"
        placeholder="সংক্ষেপ বিবরণ লিখুন"
      />
      <InputLabel
        sx={{
          minWidth: 200,
          color: 'black',
          my: 1,
          fontWeight: 500,
        }}
      >
        পাঠ্যক্রমের সংক্ষেপ বিবরণ
      </InputLabel>
      <ReactQuill
        style={{ height: '140px' }}
        theme="snow"
        value={description}
        onChange={handleDescriptionChange}
      />
    </MainCard>
  );
};

export default StepOne;
