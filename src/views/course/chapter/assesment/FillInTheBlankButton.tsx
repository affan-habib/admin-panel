import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  InputLabel,
  Stack,
  TextField
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import MarkInput from 'components/form/MarkInput';

const AddQuizButton: React.FC<any> = ({ assessmentId }) => {
  const [editorHtml, setEditorHtml] = useState<string>('');

  const handleAddSvgImage = () => {
    // Update the background color to #FFBE40
    const svgImage = `
    <img 
      src="data:image/svg+xml,
        <svg xmlns='http://www.w3.org/2000/svg' width='100' height='20'>
          <rect width='100%' height='100%' fill='%23FFBE40'/>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='black' font-size='14'>
            Blank
          </text>
        </svg>
      " 
      alt="SVG Image" 
    />
  `;
    insertSvgImage(svgImage);
  };

  const insertSvgImage = (svg: string) => {
    const quillRef = quillRefProp.current;
    const range = quillRef?.getEditor().getSelection();

    if (quillRef) {
      quillRef
        .getEditor()
        .clipboard.dangerouslyPasteHTML(range ? range.index : 0, svg, 'user');
      // Move the cursor to the end of the inserted content
      quillRef.getEditor().setSelection(range ? range.index + 1 : 1, 0);
    }
  };

  const quillRefProp = useRef<ReactQuill>(null);

  // Define the custom toolbar options
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'], // Customize the toolbar options here
      ],
    },
  };
  const countSvgImages = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const svgImages = doc.querySelectorAll('img[src^="data:image/svg+xml"]');
    return svgImages.length;
  };

  // Usage
  const svgCount = countSvgImages(editorHtml);
  console.log('Number of SVG images:', svgCount);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values: any) => {
    console.log('Form Values:', values);
    handleClose();
  };

  const [value, setValue] = React.useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };


  return (
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<AddIcon />}>
        {t('fillinthegap')}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            width: 1300,
            minHeight: 500,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
              ফিল ইন দি গ্যাপ যোগ করুন
            </Typography>
            <Button onClick={handleClose} sx={{ color: 'red' }} startIcon={<CloseIcon />}>

            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Formik initialValues={{ option: 'option1', richText: '' }}
            onSubmit={(values, actions) => {
              // Handle form submission here
              console.log(values);
              actions.setSubmitting(false);
            }}>
            {({ values, handleSubmit, setFieldValue }) => (
              <Form>
                <FormControl component="fieldset">
                  <RadioGroup row value={value} onChange={handleChange}>
                    <FormControlLabel
                      value="option1"
                      control={<Radio />}
                      label="ম্যানুয়াল ইনপুট"
                    />
                    <FormControlLabel
                      value="option2"
                      control={<Radio />}
                      label="বাল্ক আপলোড"
                    />
                  </RadioGroup>
                </FormControl>
                <Box mt={4} border="1px dashed #000" p={2} sx={{

                  minHeight: 300,

                }}>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                      নতুন প্রশ্ন
                    </Typography>
                    <Box display="flex" gap={2}>
                      <Button onClick={handleAddSvgImage} sx={{ background: '#FFBE40', color: '#1D1D1F' }} startIcon={<AddIcon />}>
                        ব্ল্যাঙ্ক যোগ করুন
                      </Button>
                      <MarkInput label="markinput" name="mark" />
                      {/* <Button variant="contained" color="primary" sx={{ background: '#646464', color: '#FAFAFA' }}>
                      মার্ক দিন
                    </Button> */}
                    </Box>


                    {/* Rest of your form content */}
                  </Box>
                  <form>
                    <Box mb={7} mt={2} >
                      <ReactQuill
                        theme="snow"
                        value={editorHtml}
                        onChange={(value) => {
                          setEditorHtml(value);
                          setFieldValue('richText', value);
                        }}
                        modules={modules}
                        ref={quillRefProp}
                      />
                    </Box>

                  </form>
                  <Stack>
                  {Array.from(
                    { length: countSvgImages(values.richText) },
                    (_, index) => (
                      <Stack direction="row" spacing={2} mb={2}>
                        <Button style={{ background: '#FFBE40', color: '#1D1D1F', width: '120px', height: '40px' }}>{`Blank ${index + 1
                          }`}</Button>
                        <TextField
                          sx={{ width: 100 }}
                          key={index}
                          type="text"
                        // name={svgCountInput[${index}]}
                        // // label={Blank ${index + 1}}
                        />
                      </Stack>
                    ),
                  )}
                </Stack>
                  <Box display="flex" justifyContent="right" alignItems="center">
                    <Box display="flex" gap={2}>
                      <Button onClick={handleClose} sx={{ background: '#006A4E', color: '#FAFAFA', width: '100px' }}>
                        সাবমিট
                      </Button>
                      <Button variant="outlined" >
                        সেভ এবং অ্যাড
                      </Button>
                    </Box>
                  </Box>
                </Box>
             
              </Form>
            )}
          </Formik>

        </Box>
      </Modal>
    </>
  );
};

export default AddQuizButton;
