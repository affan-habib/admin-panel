import React from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import InputField from 'components/form/InputField';
import RichTextInput from 'components/form/RichTextInput';

const StepOne: React.FC = () => {
  return (
    <>
      <InputField
        name="name_bn"
        label="পাঠ্যক্রমের নাম"
        placeholder="পাঠ্যক্রমের নাম লিখুন"
        required={true}
      />
      <InputField
        name="short_desc_bn"
        label="পাঠ্যক্রমের সংক্ষেপ বিবরণ"
        placeholder="সংক্ষেপ বিবরণ লিখুন"
      />
      <RichTextInput label="পাঠ্যক্রমের বিস্তারিত বিবরণ" name="long_desc_bn" height='280px'/>
    </>
  );
};

export default StepOne;
