import {
  Box,
  Button,
  FormControlLabel,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  Stack,
  TextField,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import MarkInput from 'components/form/MarkInput';
import axios from 'axios';
import { apiBaseUrl } from '../../../../../config';
import { useSnackbar } from 'context/SnackbarContext';
import { useQueryClient } from 'react-query';
import { toBanglaNumber } from 'utils/numberUtils';

const EditFillInTheGapForm: React.FC<any> = ({
  data,
  handleCloseDialog,
}) => {
  const { showSnackbar } = useSnackbar();
  const [editorHtml, setEditorHtml] = useState<string>(data.question);

  const svgImage = `
  <img 
    src="data:image/svg+xml,
      <svg xmlns='http://www.w3.org/2000/svg' width='80' height='24'>
        <rect width='100%' height='100%' fill='%23FFBE40'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='black' font-size='14'>
          Blank
        </text>
      </svg>
    " 
    alt="SVG Image" 
  />
`;
  const handleAddSvgImage = () => {
    // Update the background color to #FFBE40

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
    } // Access the editor value
    console.log('Editor Value:', editorHtml.replace(/<[^>]*>/g, ''));
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
  const { t } = useTranslation();
  const queryClient = useQueryClient();


  const onSubmit = async (values: any) => {
    try {
      const response = await axios.patch(
        `${apiBaseUrl}/quizzes/${data.id}`,
        { ...values, options: values.options.slice(0, svgCount) },
      );
      showSnackbar(response.data.message, 'success');
      queryClient.invalidateQueries('couse-quizzes');
      handleCloseDialog();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Formik
        initialValues={data}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form>
            <Box mb={2} display="flex" flexDirection="row" justifyContent="">
              <FormControlLabel
                value="option1"
                control={<Radio />}
                label={t('manualInput')}
                disabled // Make the first option disabled
                checked // Make the first option selected
              />
              <FormControlLabel
                value="option2"
                disabled // Make the first option disabled
                control={<Radio />}
                label={t('bulkUpload')}
              />
            </Box>

            <Box
              sx={{
                border: '1px dashed #D0D0D0',
                p: 2,
                borderRadius: 2,
                bgcolor: '#FAFAFA',
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" gutterBottom>
                  {t('newQues')}
                </Typography>
                <Box display="flex" gap={2}>
                  <Button
                    onClick={handleAddSvgImage}
                    sx={{ background: '#FFBE40', color: '#1D1D1F' }}
                    startIcon={<AddIcon />}
                  >
                    {t('addBlank')}
                  </Button>
                  <MarkInput label="markinput" name="mark" />
                </Box>
              </Box>
              <Box mb={7} mt={2}>
                <ReactQuill
                  style={{ height: '140px' }}
                  theme="snow"
                  value={values.question}
                  onChange={(value) => {
                    setEditorHtml(value);
                    setFieldValue('question', value);
                  }}
                  modules={modules}
                  ref={quillRefProp}
                />
              </Box>

              <Stack>
                {svgCount > 0 && (
                  <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                      {t('answer')}
                    </Typography>
                    {/* Include your answer input fields or components here */}
                  </Box>
                )}
                {Array.from(
                  { length: countSvgImages(values.question) },
                  (_, index) => (
                    <Stack direction="row" spacing={4} mb={2}>
                      <Button
                        style={{
                          background: '#FFBE40',
                          color: '#1D1D1F',
                          width: '120px',
                          height: '40px',
                        }}
                      >{`${t('blank')} ${index + 1}`}</Button>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          align="center"
                          sx={{
                            color: 'white',
                            px: 2,
                            py: 1,
                            width: 56,
                            height: 40,
                            background: 'grey',
                            textAlign: 'center',
                          }}
                        >
                          {toBanglaNumber(index + 1)}
                        </Typography>

                        <Field
                          type="text"
                          name={`options.${index}.option_value`} // Dynamic name based on index
                          as={TextField}
                          sx={{ width: '400px' }}
                          label={`${t('answer')} ${toBanglaNumber(index + 1)}`}
                        />
                      </Stack>
                    </Stack>
                  ),
                )}
              </Stack>
              <Box display="flex" justifyContent="right" alignItems="center">
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    sx={{
                      background: '#006A4E',
                      color: '#FAFAFA',
                      width: '100px',
                    }}
                    type="submit"
                  >
                    {t('submit')}
                  </Button>

                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditFillInTheGapForm;
