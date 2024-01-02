import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Stack,
    FormControl,
} from '@mui/material';

import { Formik, Form, FieldArray } from 'formik';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MarkInput from 'components/form/MarkInput';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useSnackbar } from 'context/SnackbarContext';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import RichTextInput from 'components/form/RichTextInput';

import * as Yup from 'yup';
interface Item {
    id: number;
    placeholder: string;
    option_key: string;
    answer: string;
    showInput?: boolean;
}

const AddMatchingForm: React.FC<any> = ({ assessmentId, handleCloseDialog, maxMark }) => {
    const { t } = useTranslation();
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [expandedGrids, setExpandedGrids] = useState<number[]>([]);
    const [uploadOption, setUploadOption] = useState('manualUpload');

    const handleUploadOption = (event: any) => {
        setUploadOption(event.target.value);
    }
    const toggleGrid = (index: number) => {
        setExpandedGrids((prev) => {
            const indexInExpandedGrids = prev.indexOf(index);

            if (indexInExpandedGrids === -1) {
                // If not already expanded, add it to the array
                return [...prev, index];
            } else {
                // If already expanded, remove it from the array
                const newExpandedGrids = [...prev];
                newExpandedGrids.splice(indexInExpandedGrids, 1);
                return newExpandedGrids;
            }
        });
    };
    const validationSchema = Yup.object().shape<any>({
        question: Yup.string().required('Question is required'),
        mark: Yup.number()
            .required('Mark is required')
            .max(maxMark, 'should not be more than total marks')
            .positive('Mark must be a positive number'),
    });
    const handleDeleteClick = (index: number, handleChange: any) => {
        // Clear the input value
        handleChange({
            target: {
                name: `options.${index}.wrong_answer`,
                value: '', // Clear the value
            },
        });

        // Toggle the grid
        toggleGrid(index);
    };
    const handleSubmit = async (values: any, formikHelpers: any, shouldCloseDialog: boolean) => {
        // Filter out options with empty option_key and option_value
        const filteredOptions = values.options.filter(
            (option: any) => option.option_key.trim() !== '' || option.option_value.trim() !== ''
        );
        try {
            const response = await axios.post(`${apiBaseUrl}/quizzes`, {
                course_assessment_id: assessmentId,
                question: values.question,
                mark: values.mark,
                question_type: 'text',
                type_id: 3,
                status: 1,
                options: filteredOptions,
            });

            showSnackbar(response.data.message, 'success');
            queryClient.invalidateQueries('couse-quizzes');


            // Reset the form
            formikHelpers.resetForm();

            // Close the dialog only if shouldCloseDialog is true
            if (shouldCloseDialog) {
                handleCloseDialog();
            }
        } catch (error: any) {
            showSnackbar(error.response.data.message, 'error');
            console.error('Error submitting form:', error);
        }
    };

    const [shouldCloseDialog, setShouldCloseDialog] = useState(true);
    return (
        <Formik
            initialValues={{
                mark: '',
                question: '',
                option_value: '',
                option_key: '',
                wrong_answer: '',
                options: [
                    { option_key: '', option_value: '', wrong_answer: '' },
                    { option_key: '', option_value: '', wrong_answer: '' },
                    { option_key: '', option_value: '', wrong_answer: '' },
                    { option_key: '', option_value: '', wrong_answer: '' },
                ],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers, shouldCloseDialog)}
        >
            {({ values, handleSubmit, handleChange }) => (
                <Form>
                    <RadioGroup row
                    >
                        <FormControlLabel
                            value="manualUpload"
                            control={<Radio />}
                            onChange={handleUploadOption}
                            checked={uploadOption === 'manualUpload'}
                            label={t('manualInput')}
                        />
                        <FormControlLabel
                            value="bulkUpload"
                            control={<Radio />}
                            onChange={handleUploadOption}
                            checked={uploadOption === 'bulkUpload'}
                            label={t('bulkUpload')}
                            disabled
                        />
                    </RadioGroup>
                    <Grid mt={1} mb={1} border="1px dashed rgba(70, 83, 96, 1)" sx={{ borderRadius: '8px', backgroundColor: 'rgba(250, 250, 250, 1)' }} p={2}>
                        <Grid
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ fontSize: '16px' }}>
                                {t('instruction')}
                            </Typography>
                            <MarkInput name="mark" />
                        </Grid>
                        <Box mb={2} mt={2}>
                            <RichTextInput name="question" height="100px" />
                        </Box>
                        <div style={{ marginTop: '80px', marginBottom: '20px' }}>
                            <FieldArray
                                name="options"
                                render={({ push }) => (
                                    <>
                                        <Grid container  justifyContent="start">
                                            {values.options.map((item, index) => (
                                                <Grid item xs={12} md={10} lg={10} key={index}>
                                                    <Grid
                                                        container
                                                        sx={{
                                                            border: '1px solid #ccc',
                                                            padding: 2,
                                                            marginBottom: '10px',
                                                            width: '100%',
                                                            color: 'rgba(100, 100, 100, 1)',
                                                            borderRadius: '4px',
                                                        }}
                                                        
                                                    >
                                                        <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4} lg={4}>
                                                            <FormControl fullWidth size="small">
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        borderRadius: '4px',
                                                                        overflow: 'hidden',
                                                                        border: '1px solid rgba(100, 100, 100, 1)',
                                                                        marginBottom: { xs: '10px', md: '0' },
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            p: '10px',
                                                                            backgroundColor: 'rgba(100, 100, 100, 1)',
                                                                            flexShrink: 0,
                                                                        }}
                                                                    >
                                                                        <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </Box>
                                                                    <input
                                                                        name={`options.${index}.option_key`}
                                                                        placeholder={`${t('alternativematch')} : ${index + 1}`}
                                                                        style={{
                                                                            flex: 1,
                                                                            padding: '14.5px',
                                                                            backgroundColor: 'rgba(245, 247, 248, 1)',
                                                                            border: 'none',
                                                                            borderLeft: 'none',
                                                                            outline: 'none',
                                                                        }}
                                                                        value={item.option_key}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Box>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4} lg={4} display="flex" alignItems="center">
                                                            <CheckBoxIcon sx={{color:'rgba(159, 159, 159, 1)'}} />
                                                            <FormControl fullWidth size="small">
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        borderRadius: '4px',
                                                                        overflow: 'hidden',
                                                                        border: '1px solid rgba(100, 100, 100, 1)',
                                                                        marginBottom: { xs: '10px', md: '0' },
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            p: '10px',
                                                                            backgroundColor: 'rgba(100, 100, 100, 1)',
                                                                            flexShrink: 0,
                                                                        }}
                                                                    >
                                                                        <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </Box>
                                                                    <input
                                                                        style={{
                                                                            flex: 1,
                                                                            padding: '14.5px',
                                                                            backgroundColor: 'rgba(245, 247, 248, 1)',
                                                                            border: 'none',
                                                                            borderLeft: 'none',
                                                                            outline: 'none',
                                                                        }}
                                                                        name={`options.${index}.option_value`}
                                                                        placeholder={`${t('answer')} : ${index + 1}`}
                                                                        value={item.option_value}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Box>
                                                            </FormControl>
                                                        </Grid>
                                                        {expandedGrids.includes(index) ? (
                                                            <Grid item xs={12} md={4} lg={4} display="flex">
                                                                <FormControl fullWidth size="small">
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            borderRadius: '4px',
                                                                            overflow: 'hidden',
                                                                            border: '1px solid rgba(100, 100, 100, 1)',
                                                                        }}
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                p: '10px',
                                                                                backgroundColor: 'rgba(100, 100, 100, 1)',
                                                                                flexShrink: 0,
                                                                            }}
                                                                        >
                                                                            <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                                {index + 1}
                                                                            </Typography>
                                                                        </Box>
                                                                        <input
                                                                            style={{
                                                                                flex: 1,
                                                                                padding: '14.5px',
                                                                                backgroundColor: 'rgba(245, 247, 248, 1)',
                                                                                border: 'none',
                                                                                borderLeft: 'none',
                                                                                outline: 'none',
                                                                            }}
                                                                            name={`options.${index}.wrong_answer`}
                                                                            placeholder={`${t('wronganswertwo')} : ${index + 1}`}
                                                                            value={item.wrong_answer}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </Box>
                                                                </FormControl>
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() => handleDeleteClick(index, handleChange)}
                                                                >
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        ) : (
                                                            <Grid item xs={12} md={4} lg={4} display="flex">
                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{
                                                                        fontWeight: '400',
                                                                        color: 'rgba(100, 100, 100, 1)',
                                                                        borderColor: 'rgba(100, 100, 100, 1)',
                                                                        '&:hover': {
                                                                            borderColor: 'rgba(100, 100, 100, 1)',
                                                                        },
                                                                    }}
                                                                    fullWidth
                                                                    onClick={() => toggleGrid(index)}
                                                                >
                                                                    <AddCircleOutlinedIcon sx={{ fontWeight: '400' }} />
                                                                    <span style={{ marginLeft: '3px', fontSize: '12px' }}>
                                                                        {t('wronganswer')}
                                                                    </span>
                                                                </Button>
                                                            </Grid>
                                                        )}
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Grid
                                            container
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                            spacing={2}
                                            mt={1}
                                        >
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        push({ id: values.options.length + 1, option_key: '', answer: '' });
                                                    }}
                                                >
                                                    <AddCircleOutlineOutlinedIcon />
                                                    <span style={{ marginLeft: '3px' }}>{t('addMore')}</span>
                                                </Button>
                                            </Grid>
                                            <Grid item sx={{ display: 'flex', gap: 2 }}>
                                                <Button variant="contained" type="submit" onClick={() => setShouldCloseDialog(true)}>
                                                    {t('submit')}
                                                </Button>
                                                <Button variant="outlined" type="submit" onClick={() => setShouldCloseDialog(false)}>
                                                    {t('saveAdd')}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            />
                        </div>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default AddMatchingForm;
