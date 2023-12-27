import React, { useState } from 'react';
import ReactQuill from 'react-quill';
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
interface Item {
    id: number;
    placeholder: string;
    option_key: string;
    answer: string;
    showInput?: boolean;
}

const AddMatchingForm: React.FC<any> = ({ assessmentId = '7', handleCloseDialog }) => {
    const { t } = useTranslation();
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [expandedGrids, setExpandedGrids] = useState<number[]>([]);

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
    const handleSubmit = async (values: any) => {

        try {
            const response = await axios.post(`${apiBaseUrl}/quizzes`, {
                course_assessment_id: assessmentId,
                question: values.question,
                mark: values.mark,
                question_type: 'text',
                type_id: 3,
                status: 1,
                options: values.options
            });
            showSnackbar(response.data.message, 'success');
            queryClient.invalidateQueries('courseDetails');
            // onClose();
        } catch (error: any) {
            showSnackbar(error.response.data.message, 'error');
            console.error('Error submitting form:', error);
        }
    };
    return (
        <Formik
            initialValues={{
                mark: '',
                question: '',
                option_value: '',
                option_key: '',
                wrong_answer: '',
                options: [
                    { id: 1, option_key: '', option_value: '', wrong_answer: '' },
                    { id: 2, option_key: '', option_value: '', wrong_answer: '' },
                    { id: 3, option_key: '', option_value: '', wrong_answer: '' },
                    { id: 4, option_key: '', option_value: '', wrong_answer: '' },
                ],
            }}
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, handleChange }) => (
                <Form>
                    <RadioGroup row aria-label="submissionType" name="submission_type">
                        <FormControlLabel value="written" control={<Radio />} label={t('manualInput')} />
                        <FormControlLabel value="upload" control={<Radio />} label={t('bulkUpload')} />
                    </RadioGroup>
                    <Grid mt={1} mb={1} border="1px dashed rgba(70, 83, 96, 1)" sx={{ borderRadius: '8px', backgroundColor:'rgba(250, 250, 250, 1)' }} p={2}>
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
                                        <Grid container spacing={2} xs={12} justifyContent="start">
                                            {values.options.map((item, index) => (
                                                <Grid item xs={12} md={9} lg={9} key={item.id}>
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
                                                        justifyContent="space-between"
                                                    >
                                                        <Grid item xs={12} md={4} lg={4}>
                                                            <FormControl fullWidth size="small">
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    bgcolor="gray"
                                                                    justifyContent="space-between"
                                                                    sx={{ width: '42px',borderTopLeftRadius:'4px', borderBottomLeftRadius:'4px' }}
                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        name={`options.${index}.option_key`}
                                                                        style={{ padding: '10px', borderTopRightRadius:'4px',borderBottomRightRadius:'4px', border:'1px solid rgba(208, 208, 208, 1)'}}
                                                                        placeholder={`${t('alternativematch')} : ${item.id}`}
                                                                        value={item.option_key}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Stack>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4} lg={4} display="flex" alignItems="center">
                                                            <CheckBoxIcon />
                                                            <FormControl fullWidth size="small">
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    bgcolor="gray"
                                                                    justifyContent="space-between"
                                                                    sx={{ width: '42px',borderTopLeftRadius:'4px', borderBottomLeftRadius:'4px' }}
                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        name={`options.${index}.option_value`}
                                                                        style={{ padding: '10px', borderTopRightRadius:'4px',borderBottomRightRadius:'4px', border:'1px solid rgba(208, 208, 208, 1)'}}
                                                                        placeholder={`${t('answer')} : ${item.id}`}
                                                                        value={item.option_value}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Stack>
                                                            </FormControl>
                                                        </Grid>
                                                        {expandedGrids.includes(index) ? (
                                                            <Grid item xs={12} md={3} lg={3} display="flex">
                                                                <FormControl>
                                                                    <Stack
                                                                        direction="row"
                                                                        alignItems="center"
                                                                        bgcolor="gray"
                                                                        justifyContent="space-between"
                                                                        sx={{ width: '174px',borderTopLeftRadius:'4px', borderBottomLeftRadius:'4px' }}
                                                                    >
                                                                        <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                            {item.id}
                                                                        </Typography>
                                                                        <input
                                                                            name={`options.${index}.wrong_answer`}
                                                                            style={{ padding: '10px',width:'140px' , borderTopRightRadius:'4px',borderBottomRightRadius:'4px', border:'1px solid rgba(208, 208, 208, 1)'}}
                                                                            placeholder={`${t('wronganswertwo')} : ${item.id}`}
                                                                            value={item.wrong_answer}
                                                                            onChange={handleChange}
                                                                            
                                                                        />
                                                                    </Stack>
                                                                </FormControl>
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() => handleDeleteClick(index, handleChange)}
                                                                >
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        ) : (
                                                            <Grid item xs={12} md={3} lg={3} display="flex">
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
                                                <Button variant="contained" type="submit">
                                                    {t('submit')}
                                                </Button>
                                                <Button variant="outlined" type="submit">
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
