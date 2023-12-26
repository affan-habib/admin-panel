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
import { Formik, Form, Field } from 'formik';
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

const AddQuizForm: React.FC<any> = ({ assessmentId, handleCloseDialog }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

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

  const handleQuillChange = (html: string) => {
    setEditorHtml(html);
  };

  const [inputFields, setInputFields] = useState([
    { id: 1, placeholder: 'Email 1' },
    { id: 2, placeholder: 'Email 2' },
  ]);

  const handleAddMore = () => {
    const newId = inputFields[inputFields.length - 1].id + 1;
    setInputFields([
      ...inputFields,
      { id: newId, placeholder: `Email ${newId}` },
    ]);
  };

  // const [value, setValue] = React.useState('');

  // const handleChange = (event: any) => {
  //   setValue(event.target.value);
  // };

  const [showEditor, setShowEditor] = useState(false);

  const handleToggleEditor = () => {
    setShowEditor(!showEditor);
  };

  return (
    <Formik initialValues={{ option: 'option1' }} onSubmit={handleSubmit}>
      <Form>
        <Box my={2} display="flex" justifyContent="" gap={8} px={2}>
          <FormControl component="fieldset">
            <Field as={RadioGroup} row name="option">
              <FormControlLabel
                value="option1"
                control={<Radio />}
                label={t('manualInput')}
              />
              <FormControlLabel
                value="option2"
                control={<Radio />}
                label={t('bulkUpload')}
              />
            </Field>
          </FormControl>
        </Box>

        <Box
          mt={2}
          border="1px dashed rgba(208, 208, 208, 1)"
          borderRadius={2}
          p={2}
          mx={2}
        >
          <Box
            mb={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Typography>{t('quizType')}:</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
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
              <MarkInput name="mark" />
            </Box>
          </Box>

          {selectedOption == 'option1' ? (
            <Box>
              <ReactQuill
                id="editor"
                value={editorHtml}
                onChange={handleQuillChange}
                style={{ height: '100px' }}
              />
            </Box>
          ) : (
            <Box>
              <VideoUploadBox name="url" label="ভিডিও আপলোড করুন" />
            </Box>
          )}

          <Grid
            container
            columns={10}
            spacing={2}
            mt={5}
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
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ marginTop: '4px' }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      bgcolor="gray"
                      justifyContent="space-between"
                      // maxWidth={210}
                      sx={{ width: '100%' }}
                    >
                      <Typography
                        align="center"
                        sx={{ color: 'white', px: 2, width: 100 }}
                      >
                        {field.id}
                      </Typography>
                      <input
                        style={{ padding: '10px' }}
                        placeholder={t('alternative')}
                      />
                    </Stack>
                  </FormControl>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
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
        </Box>
      </Form>
    </Formik>
  );
};

export default AddQuizForm;
