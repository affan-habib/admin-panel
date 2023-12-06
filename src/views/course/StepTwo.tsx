import React from 'react';
import 'react-quill/dist/quill.snow.css';
import InputField from 'components/form/InputField';
import MainCard from 'components/cards/MainCard';
import RichTextInput from 'components/form/RichTextInput';

const StepOne: React.FC = () => {
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
