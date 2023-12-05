import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import InputField from 'components/form/InputField';
import MainCard from 'components/cards/MainCard';
import { InputLabel } from '@mui/material';
import RichTextInput from 'components/form/RichTextInput';

const StepOne: React.FC = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (value: any) => {
    setDescription(value);
  };

  return (
    <MainCard title="পাঠ্যক্রম তৈরি করুন">
      <InputField
        name="name"
        label="Course Name"
        placeholder="Write the name here..."
      />
      <InputField
        name="short_desc"
        label="Short Details Of Course"
        placeholder="Write the text here..."
      />
      <RichTextInput label="Long Details Of Course" name="long_desc" />
    </MainCard>
  );
};

export default StepOne;
