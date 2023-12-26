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
    showAlternativeView?: boolean;
}

const AddMatchingForm: React.FC<any> = ({ assessmentId = '7', handleCloseDialog }) => {
    const { t } = useTranslation();
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [editorHtml, setEditorHtml] = useState('');
    const [deletedGrids, setDeletedGrids] = useState<number[]>([]);
    const [values, setValues] = useState({
        option: 'option1',
        mark: '',
        question: 'Testing',
        option_value: '',
        option_key: '',
        wrong_answer: '',
        items: [
            { id: 1, placeholder: 'Email 1', option_key: '', option_value: '', wrong_answer: '', showAlternativeView: false },
            { id: 2, placeholder: 'Email 2', option_key: '', option_value: '', wrong_answer: '', showAlternativeView: false },
            { id: 3, placeholder: 'Email 3', option_key: '', option_value: '', wrong_answer: '', showAlternativeView: false },
            { id: 4, placeholder: 'Email 4', option_key: '', option_value: '', wrong_answer: '', showAlternativeView: false },
        ],
    });

    const toggleGrid = (index: number) => {
        setValues((prevValues) => {
            const newItems = [...prevValues.items];
            const currentItem = newItems[index];
            currentItem.showAlternativeView = !currentItem.showAlternativeView;
            return { ...prevValues, items: newItems };
        });
    };
    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/quizzes`, {
                course_assessment_id: assessmentId,
                question: values.question,
                supporting_notes_en: values.correctAnswer,
                mark: values.mark,
                question_type: 'text',
                type_id: 5,
                status: 1,
            });

            showSnackbar(response.data.message, 'success');
            queryClient.invalidateQueries('courseDetails');
        } catch (error: any) {
            showSnackbar(error.response.data.message, 'error');
            console.error('Error submitting form:', error);
        }
    };

    const handleQuillChange = (html: string) => {
        setEditorHtml(html);
    };

    return (
        <Formik
            initialValues={values}
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, handleChange }) => (
                <Form>
                    <RadioGroup row aria-label="submissionType" name="submission_type">
                        <FormControlLabel value="written" control={<Radio />} label={t('manualInput')} />
                        <FormControlLabel value="upload" control={<Radio />} label={t('bulkUpload')} />
                    </RadioGroup>
                    <Grid mt={1} mb={1} border="1px dashed rgba(70, 83, 96, 1)" sx={{ borderRadius: '8px' }} p={2}>
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
                        <RichTextInput  name="question_type" />
                        </Box>
                        <div style={{ marginTop: '80px', marginBottom: '20px' }}>
                            <FieldArray
                                name="items"
                                render={({ push, remove }) => (
                                    <>
                                        <Grid container spacing={2} xs={12} justifyContent="start">
                                            {values.items.map((item, index) => (
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
                                                        <Grid item xs={12} md={3} lg={3}>
                                                            <FormControl fullWidth size="small">
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    bgcolor="gray"
                                                                    justifyContent="space-between"
                                                                    sx={{ width: '42px' }}
                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        name={`items.${index}.option_key`}
                                                                        style={{ padding: '10px' }}
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
                                                                    sx={{ width: '42px' }}
                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        name={`items.${index}.option_value`}
                                                                        style={{ padding: '10px' }}
                                                                        placeholder={`${t('answer')} : ${item.id}`}
                                                                        value={item.option_value}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Stack>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3} lg={3} display="flex">
                                                            {item.showAlternativeView ? (
                                                                <Grid container item xs={12} md={12} lg={12} display='flex'>
                                                                    <FormControl>
                                                                        <Stack
                                                                            direction="row"
                                                                            alignItems="center"
                                                                            bgcolor="gray"
                                                                            justifyContent="space-between"
                                                                        >
                                                                            <Typography align="center" sx={{ color: 'white', px: 2 }}>
                                                                                {item.id}
                                                                            </Typography>
                                                                            <input
                                                                                name={`items.${index}.wrong_answer`}
                                                                                style={{ padding: '10px', width:'140px' }}
                                                                                placeholder={`${t('wronganswertwo')} : ${item.id}`}
                                                                                value={item.wrong_answer}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </Stack>
                                                                    </FormControl>
                                                                    <IconButton
                                                                        aria-label="delete"
                                                                        onClick={() => toggleGrid(index)}
                                                                        sx={{ alignSelf: 'center' }}
                                                                    >
                                                                        <DeleteOutlineIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                            ) : (
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
                                                        push({ id: values.items.length + 1, option_key: '', answer: '' });
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
