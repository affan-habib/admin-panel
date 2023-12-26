import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, Grid, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import Checkbox from '@mui/material/Checkbox';
import RichTextInput from 'components/form/RichTextInput';

export default function EditAssessmentModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'xl',
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            pt: 4,
          }}>
            <Box sx={{ borderBottom: '1px solid rgba(208, 208, 208, 1)' }}>
              <Typography id="transition-modal-title" variant="h6" color='primary' component="h3" sx={{ px: 3 }}>
                এসেসমেন্ট : কারবালা প্রান্তরের উপর সম্মিলিত প্রশ্নপত্র
              </Typography>
              <Typography id="transition-modal-description" variant="caption" sx={{ marginTop:'10px', px: 3 }}>
                বর্ণনামূলক প্রশ্নপত্র . ১০ টি প্রশ্ন
              </Typography>
            </Box>
            <Box>
              <Box sx={{ border: '1px dashed rgba(208, 208, 208, 1)', margin: '15px', borderRadius: '5px' }}>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, actions) => {
                    console.log('Form submitted with values:', values);
                    actions.setSubmitting(false);
                  }}
                >
                  {({ }) => (
                    <Form>
                      <>
                        <Typography sx={{ padding: '15px' }}>
                          প্রশ্ন ১:
                        </Typography>
                        <Box sx={{
                          marginLeft: '15px',
                          marginRight: '15px'
                        }}>
                          <RichTextInput name="description" height="70px" />
                        </Box>
                        <Box>
                          <Typography sx={{ paddingLeft: '15px' }}>বিকল্প:</Typography>
                        </Box>

                        <Grid container columns={8} spacing={2} sx={{ padding: "10px" }}>
                          {[...Array(4)].map((_, index) => (
                            <Grid item md={3} key={index}>
                              <Box sx={{ display: 'flex', border: '1px dashed rgba(208, 208, 208, 1)', borderRadius: '5px', margin: "5px" }}>
                                <Checkbox />
                                <FormControl fullWidth variant="outlined" size="small" sx={{ padding: '10px', display: 'flex' }}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    bgcolor="gray"
                                    justifyContent="space-between"
                                    sx={{ width: '100%' }}
                                  >
                                    <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                      Input
                                    </Typography>
                                    <Field name={`field${index}`} placeholder="alternative" style={{ padding: '10px', width: '90%' }} />
                                  </Stack>
                                </FormControl>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div >
  );
}