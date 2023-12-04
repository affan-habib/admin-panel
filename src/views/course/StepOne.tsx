import React from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import InputField from 'components/form/InputField';
import MainCard from 'components/cards/MainCard';
import RichTextInput from 'components/form/RichTextInput';

const StepOne: React.FC = () => {
  return (
    <MainCard title="পাঠ্যক্রম তৈরি করুন">
      <InputField
        name="code"
        label="পাঠ্যক্রমের কোড"
        placeholder="পাঠ্যক্রমের কোড লিখুন"
      />
      <InputField
        name="name"
        label="পাঠ্যক্রমের নাম"
        placeholder="পাঠ্যক্রমের নাম লিখুন"
      />
      <InputField
        name="short_desc"
        label="পাঠ্যক্রমের সংক্ষেপ বিবরণ"
        placeholder="সংক্ষেপ বিবরণ লিখুন"
      />
      <RichTextInput label="পাঠ্যক্রমের বিস্তারিত বিবরণ" name="long_desc" />
    </MainCard>
  );
};

export default StepOne;
