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
import { Formik, Form, FieldArray, Field } from 'formik';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';
import MarkInput from 'components/form/MarkInput';
import ImageUploadBox from 'components/form/ImageUploadBox';
import RichTextInput from 'components/form/RichTextInput';

const AddQuizForm: React.FC<any> = ({ assessmentId, handleCloseDialog }) => {
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


  const handleSubmit = (values: any) => {
    console.log('Form Values:', values);
    console.log('Editor Input:', editorHtml);
    console.log('Uploaded Image:', values.question_img);
    // Perform other actions with the form values, editor input, and image here
  };

  const handleQuillChange = (html: string) => {
    setEditorHtml(html);
  };


  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const [inputFields, setInputFields] = useState([
    { id: 1, placeholder: 'Email 1' },
    { id: 2, placeholder: 'Email 2' },
    { id: 3, placeholder: 'Email 3' },
    { id: 4, placeholder: 'Email 4' },
  ]);

  const handleAddMore = () => {
    const newId = inputFields[inputFields.length - 1].id + 1;
    setInputFields([
      ...inputFields,
      { id: newId, placeholder: `Email ${newId}` },
    ]);
  };

  const [showEditor, setShowEditor] = useState(false);

  const handleToggleEditor = () => {
    setShowEditor(!showEditor);
  };

  return (

    <Formik
      initialValues={
        {
          options: [
            {
              option_value
                : ''
            },
            {
              option_value
                : ''
            },
            {
              option_value
                : ''
            },
            {
              option_value
                : ''
            },
          ]
        }
      } onSubmit={handleSubmit} >
      {({ values }) => (
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
                  <RichTextInput name='question' />
                </Box>
                :
                <Box>
                  <ImageUploadBox
                    name="question_img"
                    label="প্রশ্ন সম্পর্কিত ছবিটি আপলোড করুন"
                  />
                </Box>
            }



            <Grid spacing={2} mt={5}
            // style={{maxHeight:'60vh',overflowY:'auto'}}
            >
              <Grid>
                <FieldArray name="options">
                  {({ push }) => (
                    <>
                    <Typography fontWeight="bold" mb={1}>
                    {t('quizAlternative')}
                    </Typography>
                      <Grid container columns={10} spacing={2}>
                        {values.options.map((_: any, index: any) => (
                          <Grid item md={4} key={index}>
                            <Box sx={{ border: '1px dashed rgba(208, 208, 208, 1)' }}>
                              <Box sx={{ display: 'flex',alignItems: 'center' }}>
                              <Grid container columns={10} spacing={2}>
                                <Grid item md={6}>
                                  <Box sx={{display:'flex'}}>
                                  <Checkbox/>
                                  <FormControl fullWidth variant="outlined" size="small" sx={{ padding: '10px',display:'flex' }}>
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      bgcolor="gray"
                                      justifyContent="space-between"
                                      // maxWidth={210}
                                      sx={{ width: '90%'}}
                                    >
                                      <Typography align="center" sx={{ color: 'white', px: 2, width: 55 }}>
                                        {index + 1}
                                      </Typography>
                                      <Field name={`options[${index}].option_value`} placeholder={t('alternative')} style={{ padding: '10px' }} />
                                    </Stack>
                                  </FormControl>
                                  </Box>
                                </Grid>
                                <Grid item md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <Box>
                                    <Typography>{t('or')}</Typography>
                                  </Box>
                                </Grid>
                                <Grid item md={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <Box sx={{ border: '1px solid rgba(208, 208, 208, 1)', borderRadius: '5px', padding: '5px',marginRight:'15px'}}>
                                    <FileUploadOutlinedIcon />
                                  </Box>
                                </Grid>
                                </Grid>
                              </Box>
                            </Box>
                          </Grid>
                        ))}


                      </Grid>
                      <Button
                        variant="contained"
                        onClick={() => push({ option_value: '', })}
                        sx={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                      >
                        {t('addMore')}
                      </Button>
                    </>
                  )}

                </FieldArray>
              </Grid>
            </Grid>

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
                    <Box sx={{
                        marginLeft: '15px',
                        marginRight:'15px'
                      }}>
                  <RichTextInput name="description" height="100px" />
                      </Box>
                  </>

                )}
              </Box>
            </div>
            <Grid item sx={{ display: 'flex', gap: 2, marginTop: '20px', justifyContent: 'flex-end' }}>
              <Button variant="contained" type="submit">
                {t('submit')}
              </Button>
              <Button variant="outlined" type="submit">
                {t('saveAdd')}
              </Button>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik >
  );
};

export default AddQuizForm;
