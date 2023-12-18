import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
} from '@mui/material';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddQuizButton: React.FC<any> = ({ assessmentId }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');

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
          <Formik initialValues={{ option: 'option1' }} onSubmit={handleSubmit}>
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
                    <Button onClick={handleClose} sx={{ background: '#FFBE40', color: '#1D1D1F' }} startIcon={<AddIcon />}>
                      ব্ল্যাঙ্ক যোগ করুন
                    </Button>
                    <Button variant="contained" color="primary" sx={{ background: '#646464', color: '#FAFAFA' }}>
                      মার্ক দিন
                    </Button>
                  </Box>


                  {/* Rest of your form content */}
                </Box>
                <form>
                  <Box mb={7} mt={2}>
                    <ReactQuill
                      id="editor"
                      value={editorHtml}
                      onChange={handleChange}
                      style={{ height: '100px' }}
                    />
                  </Box>

                </form>
                <Box display="flex" justifyContent="space-between" alignItems="center">                
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
          </Formik>

        </Box>
      </Modal>
    </>
  );
};

export default AddQuizButton;
