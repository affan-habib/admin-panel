import { Person } from '@mui/icons-material';
import { Box, Button, FormControlLabel, Grid, Modal, Typography, InputAdornment, OutlinedInput, Checkbox, FormControl, RadioGroup, Radio } from '@mui/material';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddQuizModal: React.FC = () => {
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

  const items = [
    {
      id: 1,
      placeholder: 'Email 1',
    },
    {
      id: 2,
      placeholder: 'Email 2',
    }
  ];

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
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            width: 1300,
            minHeight: 750,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Modal Content
          </Typography>
          <Formik initialValues={{ option: 'option1' }} onSubmit={handleSubmit}>
            <Form>
              <Box display="flex" justifyContent="" gap={8}>
                <FormControlLabel value="option1" control={<Checkbox />} label="Option 1" />
                <FormControlLabel value="option2" control={<Checkbox />} label="Option 2" />
              </Box>

              <Box mt={4} border="1px dashed #000" p={2}>
                <Typography variant="h6" gutterBottom>
                  Form with Text Editor
                </Typography>
                <form>
                  <Box mb={2}>
                    <FormControl component="fieldset">
                      <RadioGroup row value={value} onChange={handleChange}>
                        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                      </RadioGroup>
                    </FormControl>

                    <ReactQuill
                      id="editor"
                      value={editorHtml}
                      onChange={handleChange}
                      style={{ height: '100px' }}
                    />
                  </Box>

                  <Grid container spacing={2} mt={5}>
                    {items.map((item) => (
                      <React.Fragment key={item.id}>
                        <Grid item xs={4}>
                          <FormControl fullWidth variant="outlined" size="small" sx={{ marginTop: '12px' }}>
                            <OutlinedInput
                              startAdornment={
                                <InputAdornment position="start">
                                  <Person />
                                </InputAdornment>
                              }
                              placeholder={item.placeholder}
                              aria-label={item.placeholder}
                              aria-describedby={`outlined-${item.placeholder}`}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Typography>অথবা</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl fullWidth variant="outlined" size="small" sx={{ marginTop: '12px' }}>
                            <OutlinedInput
                              endAdornment={
                                <InputAdornment position="end">
                                  <Person />
                                </InputAdornment>
                              }
                              placeholder={item.placeholder}
                              aria-label={item.placeholder}
                              aria-describedby={`outlined-${item.placeholder}`}
                            />
                          </FormControl>
                        </Grid>
                      </React.Fragment>
                    ))}

                  </Grid>

                  <Button variant='contained' sx={{ marginTop: '12px', height: '40px', width: '160px' }}>
                    Add More
                  </Button>


                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button variant="contained" onClick={handleToggleEditor} sx={{position:'absolute',}}>
                      Toggle Editor
                    </Button>
                    <Box
                      sx={{
                        width: '100%',
                        height: showEditor ? 'auto' : '50px',
                        border: '1px solid #ccc',
                        borderRadius:'5px',
                        marginTop: '20px',
                        transition: 'height 0.3s ease-in-out',
                      }}
                    >
                      {showEditor && <>
                      <Typography p={2}>Add More Topic</Typography>
                      <ReactQuill style={{ minHeight: '100px',padding:'10px',marginTop:'20px' }}/>
                      </>}
                    </Box>
                  </div>

                </form>
              </Box>
            </Form>
          </Formik>
          <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
            Close Modal
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddQuizModal;


