import { CloudUploadOutlined, Person, SaveAlt } from '@mui/icons-material';
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
} from '@mui/material';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';

const AddQuizButton: React.FC<any> = ({ assessmentId }) => {
  const {t} = useTranslation();
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

  // const handleChange = (html: string) => {
  //   setEditorHtml(html);
  // };

  const [inputFields, setInputFields] = useState([
    { id: 1, placeholder: 'Email 1' },
    { id: 2, placeholder: 'Email 2' },
  ]);

  const handleAddMore = () => {
    const newId = inputFields[inputFields.length - 1].id + 1;
    setInputFields([...inputFields, { id: newId, placeholder: `Email ${newId}` }]);
  };

  const [value, setValue] = React.useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const [showEditor, setShowEditor] = useState(false);

  const handleToggleEditor = () => {
    setShowEditor(!showEditor);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ marginLeft: '7px' }}
        variant="outlined"
        startIcon={<AssignmentOutlinedIcon />}
      >
        {t('quiz')}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            // maxWidth: 'xl',
            width: '60vw',
            maxHeight:'85vh',
            overflowY:'auto',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            // p: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Grid sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid rgba(208, 208, 208, 1)'
          }}>
            <Typography color="primary" variant="h6" p={2}>
              {t('mcqWithPhoto')}
            </Typography>
            <IconButton onClick={handleClose} color="error" >
              <HighlightOffIcon />
            </IconButton>
          </Grid>
          <Formik initialValues={{ option: 'option1' }} onSubmit={handleSubmit}>
            <Form>
              <Box my={2} display="flex" justifyContent="" gap={8} px={2}>
                <FormControlLabel
                  value="option1"
                  control={<Checkbox />}
                  label={t('manualInput')}
                />
                <FormControlLabel
                  value="option2"
                  control={<Checkbox />}
                  label={t('bulkUpload')}
                />
              </Box>

              <Box mt={2} border="1px dashed rgba(208, 208, 208, 1)" borderRadius={2} p={2} mx={2}>
                <form>
                  <Box mb={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography>{t('quizType')}:</Typography>
                      <FormControl component="fieldset">
                        <RadioGroup row value={value} onChange={handleChange}>
                          <FormControlLabel
                            value="option1"
                            control={<Radio />}
                            label={t('written')}
                          />
                          <FormControlLabel
                            value="option2"
                            control={<Radio />}
                            label={t('photo')}
                          />
                        </RadioGroup>
                      </FormControl>

                    </Box>

                    <Box>
                      <FormControl fullWidth variant="outlined" size="small" sx={{ marginTop: '12px' }}>
                        <OutlinedInput
                          startAdornment={
                            <InputAdornment position="start">
                              <Typography>{t('markInput')}</Typography>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Box>
                  </Box>

                  <Box>
                    <ReactQuill
                      id="editor"
                      value={editorHtml}
                      onChange={handleChange}
                      style={{ height: '100px' }}
                    />
                  </Box>

                  <Grid container columns={10} spacing={2} mt={5} 
                  // style={{maxHeight:'60vh',overflowY:'auto'}}
                  >
                    {inputFields.map((field) => (
                      <Grid item xs={4} key={field.id}>
                        <Box
                          sx={{
                            border: '1px dashed rgba(208, 208, 208, 1)',
                            padding: '10px',
                            display: 'flex',
                          }}
                        >
                          <FormControl fullWidth variant="outlined" size="small" sx={{ marginTop: '4px' }}>
                            <OutlinedInput
                              startAdornment={<InputAdornment position="start"><Person /></InputAdornment>}
                              placeholder={field.placeholder}
                            />
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
                    sx={{ marginTop: '12px', height: '40px', width: '160px', display: 'flex', alignItems: 'center' }}
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
                      sx={{ position: 'absolute' }}
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
                </form>
              </Box>
            </Form>
          </Formik>
          <Box p={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap: "5px"}}>
            <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
              {t('submit')}
            </Button>
            <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
              {t('saveAdd')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddQuizButton;
