import React from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import InputField from 'components/form/InputField';
import RichTextInput from 'components/form/RichTextInput';

const StepOne: React.FC = () => {
  return (
    <>
      <InputField
        name="name_bn"
        label="অধিবেশনের নাম"
        placeholder="অধিবেশনের নাম লিখুন"
        required={true}
        withKeyboard={true}
      />
      <InputField
        name="short_desc_bn"
        label="অধিবেশনের সংক্ষেপ বিবরণ"
        placeholder="সংক্ষেপ বিবরণ লিখুন"
        withKeyboard={true}
      />
      <RichTextInput label="অধিবেশনের বিস্তারিত বিবরণ" name="long_desc_bn" height='280px'/>
    </>
  );
};

export default StepOne;
  