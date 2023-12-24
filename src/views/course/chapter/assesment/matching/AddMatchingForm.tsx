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

interface Item {
    id: number;
    placeholder: string;
    option_key: string;
    answer: string;
    showInput?: boolean;
}

const AddMatchingForm: React.FC<any> = ({ assessmentId = 7, handleCloseDialog }) => {
    const { t } = useTranslation();
    const { showSnackbar } = useSnackbar();

    const [editorHtml, setEditorHtml] = useState('');
    const [items, setItems] = useState<Item[]>([
        { id: 1, placeholder: 'Email 1', option_key: '', answer: '', showInput: false }, // Initialize showInput
        { id: 2, placeholder: 'Email 2', option_key: '', answer: '', showInput: false },
        { id: 3, placeholder: 'Email 3', option_key: '', answer: '', showInput: false },
        { id: 4, placeholder: 'Email 4', option_key: '', answer: '', showInput: false },
    ]);


    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/quizzes`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            showSnackbar(response.data.message, 'success');
            handleCloseDialog();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleQuillChange = (html: string) => {
        setEditorHtml(html);
    };

    const handleAddInput = (itemId: number) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === itemId ? { ...item, showInput: true } : item))
        );
    };

    const handleDelete = (itemId: number) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === itemId ? { ...item, showInput: false } : item))
        );
    };


    return (
        <Formik
            initialValues={{
                option: 'option1',
                option_key: '',
                items,
            }}
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
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
                            <ReactQuill id="editor" value={editorHtml} onChange={handleQuillChange} style={{ height: '100px' }} />
                        </Box>

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
                                                                    placeholder={`${t('option_key')} : ${item.id}`}
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
                                                                    name={`items.${index}.answer`}
                                                                    style={{ padding: '10px' }}
                                                                    placeholder={`${t('answer')} : ${item.id}`}
                                                                    value={item.answer}
                                                                    onChange={handleChange}
                                                                />
                                                            </Stack>
                                                        </FormControl>
                                                    </Grid>
                                                    {item.showInput ? (
                                                        <Grid item xs={12} md={3} lg={3} display='flex'>
                                                            <FormControl

                                                            >
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    bgcolor="gray"
                                                                    justifyContent="space-between"


                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2, }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        style={{ padding: '10px', width: '120px' }}
                                                                        placeholder={t('wronganswertwo')}
                                                                    />
                                                                </Stack>
                                                            </FormControl>
                                                            <IconButton
                                                                onClick={() => handleDelete(item.id)}

                                                                aria-label="delete"
                                                            >
                                                                <DeleteOutlineIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    ) : (
                                                        <Grid item xs={12} md={3} lg={3}>
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
                                                                onClick={() => handleAddInput(item.id)}
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
                                    <Grid container spacing={2}>
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
                    </Grid>
                </Form>
            )}
        </Formik>

    );
};

export default AddMatchingForm;
