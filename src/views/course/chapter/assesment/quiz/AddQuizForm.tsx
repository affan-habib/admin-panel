import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Modal,
  Typography,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  IconButton,
  Stack,
} from '@mui/material';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';
import MarkInput from 'components/form/MarkInput';
import VideoUploadBox from 'components/form/VideoUploadBox';
import ImageUploadBox from 'components/form/ImageUploadBox';

const AddQuizButton: React.FC<any> = ({ assessmentId, handleCloseDialog }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');

  const [selectedImage, setSelectedImage] = useState(null);

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = (values: any) => {
  //   console.log('Form Values:', values);
  //   handleClose();
  // };


  const handleSubmit = (values : any) => {
    console.log('Form Values:', values);
    console.log('Editor Input:', editorHtml);
    console.log('Uploaded Image:', values.question_img);
    // Perform other actions with the form values, editor input, and image here
  };

  const handleQuillChange = (html: string) => {
    setEditorHtml(html);
  };

  
  const handleImageUpload = (event : any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const [inputFields, setInputFields] = useState([
    { id: 1, placeholder: 'Email 1' },
    { id: 2, placeholder: 'Email 2' },
  ]);

  const handleAddMore = () => {
    const newId = inputFields[inputFields.length - 1].id + 1;
    setInputFields([...inputFields, { id: newId, placeholder: `Email ${newId}` }]);
  };

  const [showEditor, setShowEditor] = useState(false);

  const handleToggleEditor = () => {
    setShowEditor(!showEditor);
  };

  return (

    <Formik
      initialValues={{ option: 'option1' }} onSubmit={handleSubmit}>
      <Form>
        <FormControl component="fieldset">
          <RadioGroup row
          //  value={value} onChange={handleChange}
          >
            <FormControlLabel
              value="manual"
              control={<Radio />}
              // checked={selectedOption === 'manual'}
              // onChange={handleOptionChange}
              label={t('manualInput')}
            />
            <FormControlLabel
              value="bulk"
              control={<Radio />}
              // checked={selectedOption === 'bulk'}
              // onChange={handleOptionChange}
              label={t('bulkUpload')}
            />
          </RadioGroup>
        </FormControl>

        <Box mt={2} border="1px dashed rgba(208, 208, 208, 1)" borderRadius={2} p={2} mx={2}>
          <Box mb={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Typography>{t('quizType')}:</Typography>
              <FormControl component="fieldset">
                <RadioGroup row
                //  value={value} onChange={handleChange}
                >
                  <FormControlLabel
                    value="option1"
                    control={<Radio />}
                    checked={selectedOption === 'option1'}
                    onChange={handleOptionChange}
                    label={t('written')}
                  />
                  <FormControlLabel
                    value="option2"
                    control={<Radio />}
                    checked={selectedOption === 'option2'}
                    onChange={handleOptionChange}
                    label={t('photo')}
                  />
                </RadioGroup>
              </FormControl>

            </Box>

            <Box>
              <MarkInput name='mark' />
            </Box>
          </Box>

          {
            selectedOption == 'option1' ?
              <Box>
                <ReactQuill
                  id="editor"
                  value={editorHtml}
                  onChange={handleQuillChange}
                  style={{ height: '100px' }}
                />
              </Box>
              :
              <Box>
                <ImageUploadBox
                name="question_img"
                label="প্রশ্ন সম্পর্কিত ছবিটি আপলোড করুন"
              />
              </Box>
          }



          <Grid container columns={10} spacing={2} mt={5}
          // style={{maxHeight:'60vh',overflowY:'auto'}}
          >
            {inputFields.map((field) => (
              <Grid item xs={5} key={field.id}>
                <Box
                  sx={{
                    border: '1px dashed rgba(208, 208, 208, 1)',
                    padding: '10px',
                    display: 'flex',
                  }}
                >
                  <FormControl fullWidth variant="outlined" size="small" sx={{ marginTop: '4px' }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      bgcolor="gray"
                      justifyContent="space-between"
                      // maxWidth={210}
                      sx={{ width: '100%', }}
                    >
                      <Typography align="center" sx={{ color: 'white', px: 2, width: 100 }}>
                        {field.id}
                      </Typography>
                      <input
                        style={{ padding: '10px' }}
                        placeholder={t('alternative')}
                      />
                    </Stack>
                  </FormControl>
                  <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>{t('or')}</Typography>
                  </Grid>
                  <IconButton
                    size="small"
                    style={{
                      backgroundColor: '#FAFAFA',
                      borderRadius: '4px',
                      border: '1px solid #D0D0D0',
                    }}
                  >
                    <FileUploadOutlinedIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            onClick={handleAddMore}
            sx={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            {t('addMore')}
          </Button>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              onClick={handleToggleEditor}
            // sx={{ position: 'absolute' }}
            >
              {t('addInfo')}
            </Button>
            <Box
              sx={{
                width: '100%',
                height: showEditor ? 'auto' : '50px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginTop: '20px',
                transition: 'height 0.3s ease-in-out',
              }}
            >
              {showEditor && (
                <>
                  <Typography p={2}>{t('quizDescription')}</Typography>
                  <ReactQuill
                    style={{
                      minHeight: '100px',
                      padding: '10px',
                      // marginTop: '20px',
                    }}
                  />
                </>
              )}
            </Box>
          </div>
          <Grid item sx={{ display: 'flex', gap: 2 , marginTop:'20px',justifyContent:'flex-end'}}>
            <Button variant="contained" type="submit">
              {t('submit')}
            </Button>
            <Button variant="outlined" type="submit">
              {t('saveAdd')}
            </Button>
          </Grid>
        </Box>
      </Form>
    </Formik>

  );
};

export default AddQuizButton;
